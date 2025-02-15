const docusaurusData = require("./config/docusaurus/index.json");

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

const getDocId = (doc) => {
  return doc
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(1)
    .join("/");
};

const getPageRoute = (page) => {
  return page
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(2)
    .join("/");
};

const getPath = (page) => {
  return page.replace(/\.mdx?$/, "");
};

const formatFooterItem = (item) => {
  if (item.title) {
    return {
      title: item.title,
      items: item.items.map((subItem) => {
        return formatFooterItem(subItem);
      }),
    };
  } else {
    let linkObject = {
      label: item.label,
    };

    if (item.to) {
      linkObject.to = getPath(item.to);
    } else if (item.href) {
      linkObject.href = item.href;
    } else {
      linkObject.to = "/blog";
    }

    return linkObject;
  }
};

const formatNavbarItem = (item, subnav = false) => {
  let navItem = {
    label: item.label,
  };

  if (!subnav) {
    navItem.position = item.position;
  }

  if (item.link === "external" && item.externalLink) {
    navItem.href = item.externalLink;
  }

  if (item.link === "blog") {
    navItem.to = "/blog";
  }

  if (item.link === "page" && item.pageLink) {
    navItem.to = getPageRoute(item.pageLink);
  }

  if (item.link === "doc" && item.docLink) {
    navItem.type = "doc";
    navItem.docId = getDocId(item.docLink);
  }

  if (item.items) {
    navItem.type = "dropdown";
    navItem.items = item.items.map((subItem) => {
      return formatNavbarItem(subItem, true);
    });
  }

  return navItem;
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: docusaurusData.title || "My Site",
  tagline: docusaurusData.tagline || "Dinosaurs are cool",
  url: process.env.NEXT_PUBLIC_WEBSITE_URL || "https://tinasaurus.vercel.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          routeBasePath: "docs",
          editUrl: ({ versionDocsDirPath, docPath }) => {
            const baseUrl =
              process.env.NEXT_PUBLIC_WEBSITE_URL ||
              "https://platform-nx-doc.vercel.app/";
            return `${baseUrl}admin/#/collections/edit/doc/${docPath.replace(
              /\.mdx?$/,
              ""
            )}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: `${
            process.env.NEXT_PUBLIC_WEBSITE_URL ||
            "https://tinasaurus.vercel.app/"
          }admin/#/collections/post`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
    [
      "docusaurus-biel",
      {
        project: "bs95gvpsn7",
        headerTitle: "Biel.ai chatbot",
        version: "latest",
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: docusaurusData.title || "",
      logo: {
        alt: docusaurusData?.logo?.alt ? docusaurusData?.logo?.alt : "My Logo",
        src: docusaurusData?.logo?.src
          ? docusaurusData?.logo?.src
          : "img/logo.svg",
      },
      items: docusaurusData.navbar.map((item) => {
        return formatNavbarItem(item);
      }),
    },
    footer: {
      style: docusaurusData.footer?.style || "dark",
      links: docusaurusData.footer?.links.map((item) => {
        return formatFooterItem(item);
      }),
      copyright:
        `Copyright © ${new Date().getFullYear()} ` +
        (docusaurusData.footer?.copyright || docusaurusData.title),
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    // algolia: {
    //   apiKey: "6bb31e1374ef64cd121a869f67a9b5c6",
    //   indexName: "PlatformNX-docs-main",
    //   contextualSearch: true,
    //   placeholder: "Search Documentation",
    //   appId: "2MRPQ3W004",
    // },
  },
  // headTags: [
  //   {
  //     tagName: "meta",
  //     attributes: {
  //       name: "algolia-site-verification",
  //       content: "9901C1012576EECF",
  //     },
  //   },
  // ],
};

module.exports = config;
