---
id: sol-output
title: CartesiDApp
---

The **CartesiDApp** contract acts as the base layer incarnation of a DApp running on the execution layer. The DApp is hereby able to interact with other smart contracts through the execution of [vouchers](../../components.md#vouchers)
and the validation of [notices](../../components.md#notices). These outputs are generated by the [DApp back-end](../../dapp-architecture.md#back-end) on the execution layer and can be proven in the base layer thanks to claims submitted by a consensus contract.

A **voucher** is a one-time message call to another contract. It can encode asset transfers, approvals,
or any other message call that doesn't require Ether to be sent along. A voucher will only be consumed
if the underlying message call succeeds (that is, it doesn't revert). Furthermore, the return data of
the message call is discarded entirely. As a protective measure against reentrancy attacks, nested
voucher executions are prohibited.

A **notice**, on the other hand, constitutes an arbitrary piece of data that can be proven any number of times.
On their own, they do not trigger any type of contract-to-contract interaction.
Rather, they merely serve to attest off-chain results, e.g. which player won a particular chess match.

Every DApp is subscribed to a consensus contract, and governed by a single address, the owner.
The consensus has the power of submitting claims, which, in turn, are used to validate vouchers and notices.
Meanwhile, the owner has complete power over the DApp, as it can replace the consensus at any time.
Therefore, the users of a DApp must trust both the consensus and the DApp owner.

The DApp developer can choose whichever ownership and consensus models it wants.

Examples of DApp ownership models include:

* no owner (address zero)
* individual signer (externally-owned account)
* multiple signers (multi-sig)
* DAO (decentralized autonomous organization)
* self-owned DApp (off-chain governance logic)

See `IConsensus` for examples of consensus models.

This contract inherits the following OpenZeppelin contracts.

* `Ownable`
* `ERC721Holder`
* `ERC1155Holder`
* `ReentrancyGuard`

For more information, please consult [OpenZeppelin's official documentation](https://docs.openzeppelin.com/contracts/4.x/).

### executeVoucher

```solidity
function executeVoucher(address _destination, bytes _payload, struct Proof _proof) external returns (bool)
```

Try to execute a voucher.

Reverts if voucher was already successfully executed.

_On a successful execution, emits a `VoucherExecuted` event._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _destination | address | The address that will receive the payload through a message call |
| _payload | bytes | The payload, which—in the case of Solidity contracts—encodes a function call |
| _proof | struct Proof | The proof used to validate the voucher against               a claim submitted by the current consensus contract |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Whether the execution was successful or not |

### wasVoucherExecuted

```solidity
function wasVoucherExecuted(uint256 _inboxInputIndex, uint256 _outputIndex) external view returns (bool)
```

Check whether a voucher has been executed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _inboxInputIndex | uint256 | The index of the input in the input box |
| _outputIndex | uint256 | The index of output emitted by the input |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Whether the voucher has been executed before |

### validateNotice

```solidity
function validateNotice(bytes _notice, struct Proof _proof) external view returns (bool)
```

Validate a notice.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _notice | bytes | The notice |
| _proof | struct [Proof](#proof) | Data for validating outputs |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | Whether the notice is valid or not |

### migrateToConsensus

```solidity
function migrateToConsensus(contract IConsensus _newConsensus) external
```

Migrate the DApp to a new consensus.

_Can only be called by the DApp owner._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newConsensus | contract IConsensus | The new consensus |

### getTemplateHash

```solidity
function getTemplateHash() external view returns (bytes32)
```

Get the DApp's template hash.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The DApp's template hash |

### getConsensus

```solidity
function getConsensus() external view returns (contract IConsensus)
```

Get the current consensus.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract IConsensus | The current consensus |

### receive

```solidity
receive() external payable
```

Accept Ether transfers.

_If you wish to transfer Ether to a DApp while informing
     the DApp backend of it, then please do so through the Ether portal contract._

### withdrawEther

```solidity
function withdrawEther(address _receiver, uint256 _value) external
```

Transfer some amount of Ether to some recipient.

_This function can only be called by the DApp itself through vouchers._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _receiver | address | The address which will receive the amount of Ether |
| _value | uint256 | The amount of Ether to be transferred in Wei |


### NewConsensus

```solidity
event NewConsensus(IConsensus newConsensus);
```

A new consensus is used, this event is emitted when a new consensus is set. This event must be triggered on a successful call to [migrateToConsensus](#migratetoconsensus).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newConsensus | IConsensus | The new consensus contract |

### VoucherExecuted

```solidity
event VoucherExecuted(uint256 voucherId);
```

A voucher was executed from the DApp, this event is emitted when a voucher is executed so it must be triggered on a successful call to [executeVoucher](#executevoucher).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| voucherId | uint256 | A number that uniquely identifies the voucher amongst all vouchers emitted by this DApp |

### Proof

Data for validating outputs

```solidity
struct Proof {
    OutputValidityProof validity;
    bytes context;
}
```

#### Members

| Name                        | Type      | Description                                                       |
| --------------------------- | --------- | ----------------------------------------------------------------- |
| validity                  | [OutputValidityProof](#outputvalidityproof)   | A validity proof for the output                                |
| context                 | bytes   | Data for querying the right claim from consensus                     |

### OutputValidityProof

Data used to prove the validity of an output (notices and vouchers)

```solidity
struct OutputValidityProof {
  uint256 inputIndexWithinEpoch;
  uint256 outputIndexWithinInput;
  bytes32 outputHashesRootHash;
  bytes32 vouchersEpochRootHash;
  bytes32 noticesEpochRootHash;
  bytes32 machineStateHash;
  bytes32[] outputHashInOutputHashesSiblings;
  bytes32[] outputHashesInEpochSiblings;
}
```

#### Members

| Name                        | Type      | Description                                                       |
| --------------------------- | --------- | ----------------------------------------------------------------- |
| inputIndexWithinEpoch                 | uint256   | Which input, inside the epoch, the output belongs to                                |
| outputIndexWithinInput                 | uint256   | Index of output emitted by the input                      |
| outputHashesRootHash        | bytes32   | Merkle root of hashes of outputs emitted by the input    |
| vouchersEpochRootHash       | bytes32   | Merkle root of all epoch's voucher metadata hashes   |
| noticesEpochRootHash        | bytes32   | Merkle root of all epoch's notice metadata hashes    |
| machineStateHash            | bytes32   | Hash of the machine state claimed this epoch           |
| outputHashInOutputHashesSiblings      | bytes32[] | Proof that this output metadata is in metadata memory range       |
| outputHashesInEpochSiblings | bytes32[] | Proof that this output metadata is in epoch's output memory range |