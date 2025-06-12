// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Demó',
  tagline: 'Demó a Docusaurus környezetről és az OpenAPI dokumentációról, integrált Mermaid diagramokkal',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://JoniPeti018.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  //baseUrl: '/',
  // GitHub pages deployment config.
  baseUrl: '/Demo/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'JoniPeti018', // Usually your GitHub org/user name.
  projectName: 'Demo', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Többnyelvű konfiguráció
  i18n: {
    defaultLocale: 'hu', // Magyar alapértelmezett nyelv
    locales: ['hu', 'en'], // Támogatott nyelvek
    localeConfigs: {
      hu: {
        label: 'Magyar',
        direction: 'ltr',
        htmlLang: 'hu-HU',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },

  // Mermaid támogatás engedélyezése
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          docItemComponent: "@theme/ApiItem",
          editUrl: ({ locale, docPath }) => {
            if (locale !== 'hu') {
              return `https://github.com/JoniPeti018/Demo/tree/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
            }
            return `https://github.com/JoniPeti018/Demo/tree/main/docs/${docPath}`;
          },
          editCurrentVersion: true,
          editLocalizedFiles: true,
          path: 'docs',
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi', // A plugin egyedi azonosítója
        docsPluginId: 'classic',
        config: {
          petstore: {  // Egyedi azonosító az API doksinak
            specPath: 'openapi/petstore-api.yaml', // Az OpenAPI fájl elérési útja
            outputDir: 'docs/petstore', // A generált Markdown fájlok helye
            sidebarOptions: {
              groupPathsBy: 'tag',  // Csoportosítás tagek alapján az oldalsávban
              // További opciók a plugin dokumentációja szerint
            },
            // Opcionális: downloadButton: true,
          },
          dbr: {  // Egyedi azonosító az API doksinak
            specPath: 'openapi/dbr-api.yaml', // Az OpenAPI fájl elérési útja
            outputDir: 'docs/dbrapi', // A generált Markdown fájlok helye
            sidebarOptions: {
              groupPathsBy: 'tag',  // Csoportosítás tagek alapján az oldalsávban
              // További opciók a plugin dokumentációja szerint
            },
            // Opcionális: downloadButton: true,
          },
        }
      }
    ]
  ],

  // Témák hozzáadása - Mermaid téma hozzáadása
  themes: ['docusaurus-theme-openapi-docs', '@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',

      // Mermaid konfiguráció (opcionális)
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
        options: {
          maxTextSize: 90000,
          maxWidth: 200,
          fontFamily: 'trebuchet ms, verdana, arial, sans-serif',
          fontSize: 16,
          // Diagram típus specifikus beállítások
          flowchart: {
            htmlLabels: false,
            curve: 'basis',
            useMaxWidth: false,
          },
          sequence: {
            diagramMarginX: 50,
            diagramMarginY: 10,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: true,
            bottomMarginAdj: 1,
            useMaxWidth: false,
          },
          gantt: {
            titleTopMargin: 25,
            barHeight: 20,
            fontFamily: 'trebuchet ms, verdana, arial, sans-serif',
            fontSize: 11,
            fontWeight: 'normal',
            sidePadding: 75,
            leftPadding: 75,
            gridLineStartPadding: 35,
            bottomPadding: 25,
            useMaxWidth: false,
          }
        },
      },

      navbar: {
        title: 'Főoldal',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'dbrSidebar',
            position: 'left',
            label: 'DBR',
          },
          {
            type: 'docSidebar',
            sidebarId: 'dbrApiSidebar',
            label: 'DBR API',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'myApiSidebar',
            label: 'Petstore API (minta)',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Dokumentáció',
            items: [
              {
                label: 'DBR',
                to: '/docs/dbr/allrates-ratedownloader/allrates',
              },
              {
                label: 'DBR API',
                to: '/docs/dbrapi/dbr-api-server',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DBR Demó projekt, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;