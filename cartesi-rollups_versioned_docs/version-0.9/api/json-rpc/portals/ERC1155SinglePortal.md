The **ERC1155SinglePortal** allows anyone to perform single transfers of ERC-1155 tokens to a DApp while informing the off-chain machine.

### depositSingleERC1155Token

```solidity
function depositSingleERC1155Token(contract IERC1155 _token, address _dapp, uint256 _tokenId, uint256 _value, bytes _baseLayerData, bytes _execLayerData) external
```

Transfer an ERC-1155 token to a DApp and add an input to
the DApp's input box to signal such operation.

The caller must enable approval for the portal to manage all of their tokens
beforehand, by calling the `setApprovalForAll` function in the token contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC1155 | The ERC-1155 token contract |
| _dapp | address | The address of the DApp |
| _tokenId | uint256 | The identifier of the token being transferred |
| _value | uint256 | Transfer amount |
| _baseLayerData | bytes | Additional data to be interpreted by the base layer |
| _execLayerData | bytes | Additional data to be interpreted by the execution layer |
