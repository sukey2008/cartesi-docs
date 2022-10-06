// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const replacementPlugin = require("./src/remark/replacement");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cartesi Docs",
  tagline: "The Blockchain OS",
  url: "https://cartesi.io",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "cartesi", // Usually your GitHub org/user name.
  projectName: "cartesi", // Usually your repo name.
  scripts: ["/js/index.js"],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/cartesi/docs/tree/develop",
          remarkPlugins: [replacementPlugin],
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Algolia Search
      algolia: {
        appId: "STJID4NVVG",
        apiKey: "a454730829efd0e7fc91ccb52e1185a6",
        indexName: "cartesi",
        contextualSearch: true,
      },
      hotjar: {
        applicationId: "3103959",
      },
      navbar: {
        logo: {
          alt: "Cartesi Logo",
          src: "img/logo.svg",
          srcDark: "img/logo_dark.svg",
          height: "52px",
        },
        items: [

          {
            to: "/cartesi-rollups/api",
            position: "right",
            label: "Rollups APIs",
          },
          {
            to: "https://youtu.be/8kEBwJt2YLM",
            label: "Blockchain Course",
            position: "right",
          },
          {
            to: "https://cartesi.io/en/labs",
            label: "Cartesi Labs",
            position: "right",
          },
          {
            to: "https://github.com/cartesi/rollups-examples",
            label: "DApp Examples",
            position: "right",
          },
          {
            to: "https://discord.gg/Pt2NrnS",
            position: "right",
            className: "header-discord-link",
            "aria-label": "Discord",
          },
          {
            to: "https://github.com/cartesi/docs/",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },

      footer: {
        links: [
          {
            title: "Ecosystem",
            items: [
              {
                label: "The Blockchain OS",
                to: "https://cartesi.io/",
              },
              {
                label: "Our Whitepaper",
                to: "https://cartesi.io/cartesi_whitepaper.pdf",
              },
              {
                label: "Foundation Notice",
                to: "https://cartesi.io/foundation_notice.pdf",
              },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Template DApp",
                to: "https://github.com/cartesi/rollups-examples/tree/main/custom-dapps",
              },
              {
                label: "Tech Articles",
                to: "https://medium.com/cartesi/tagged/tech",
              },
              {
                label: "Bug Bounty",
                to: "https://immunefi.com/bounty/cartesi/",
              },
              {
                label: "Run a Node",
                to: "https://explorer.cartesi.io/staking",
              },
              {
                label: "CIP Process",
                to: "https://github.com/cartesi/cips",
              },
            ],
          },
          {
            title: "Github",
            items: [
              {
                label: "Rollups Examples",
                to: "https://github.com/cartesi/rollups-examples",
              },
              {
                label: "Machine Emulator",
                to: "https://github.com/cartesi/machine-emulator-tools",
              },
              {
                label: "Noether Node",
                to: "https://github.com/cartesi/noether",
              },
              {
                label: "Cartesi Compute Tutorials",
                to: "https://github.com/cartesi/descartes-tutorials",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Youtube",
                to: "https://www.youtube.com/c/Cartesiproject/videos",
              },
              {
                label: "Discord",
                to: "https://discord.gg/Pt2NrnS",
              },
              {
                label: "Medium",
                to: "https://www.medium.com/cartesi",
              },
              {
                label: "Twitter",
                to: "https://www.twitter.com/cartesiproject",
              },
              {
                label: "Telegram",
                to: "https://t.me/cartesiannouncements",
              },
              {
                label: "Reddit",
                to: "https://www.reddit.com/r/cartesi/",
              },
            ],
          },
        ],
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["lua"],
      },

    /*  // Announcemnt bar
      announcementBar: {
        id: "example_bar",
        content:
          'Documentation is under development <a target="_blank" rel="noopener noreferrer" href="#">Read more</a>',
        backgroundColor: "#2D5ABE",
        textColor: "#fff",
        isCloseable: false,
      },*/
    }),
  plugins: [
    "docusaurus-plugin-hotjar",
    async function AddTailwindCss(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    [
  '@docusaurus/plugin-google-gtag',
  {
    trackingID: 'GTM-MS89D9K',
    anonymizeIP: true,
  },
],
[
'docusaurus-plugin-openapi-docs',
  {
    id: "apiDocs",
    docsPluginId: "classic",
    config: {
      backEndApi: { // Note: petstore key is treated as the <id> and can be used to specify an API doc instance when using CLI commands
        specPath: "docs/cartesi-rollups/api/rollup.yaml", // Path to designated spec file
        outputDir: "docs/cartesi-rollups/api/rollup", // Output directory for generated .mdx docs
        sidebarOptions: {
          groupPathsBy: "tag",
        },
      },
      frontEndApi: {
        specPath: "docs/cartesi-rollups/api/inspect.yaml",
        outputDir: "docs/cartesi-rollups/api/inspect",
      }
    }
  },
],

[
  "@edno/docusaurus2-graphql-doc-generator",
  {
    schema: "docs/cartesi-rollups/api/typeDefs.graphql",
    rootPath: "./docs", // docs will be generated under './docs/swapi' (rootPath/baseURL)
    baseURL: "cartesi-rollups/api/graphql",
  },
],

  ],
themes: ["docusaurus-theme-openapi-docs"]
};

module.exports = config;