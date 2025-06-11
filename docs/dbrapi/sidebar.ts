import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "dbrapi/dbr-api-server",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "dbrapi/get-the-last-2-rows-of-rates-data",
          label: "Get the last 2 rows of rates data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-public-partner-data-pp-variant",
          label: "Get public partner data (PP variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-public-partner-data-p-variant",
          label: "Get public partner data (P variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-the-latest-dbr-test-index",
          label: "Get the latest DBR test index",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/activate-an-id-8-code",
          label: "Activate an id8 code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/activate-an-id-8-code-with-additional-details",
          label: "Activate an id8 code with additional details",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/activate-id-8-code-with-details-variant",
          label: "Activate id8 code with details (variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/activate-id-8-code-with-partner-id-details",
          label: "Activate id8 code with partner id details",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-partner-id-for-a-given-id-8-code",
          label: "Get partner id for a given id8 code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-voting-data",
          label: "Get voting data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-voting-data-variant",
          label: "Get voting data (variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/update-a-vote",
          label: "Update a vote",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/update-a-vote-variant",
          label: "Update a vote (variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/update-vote-with-utc-timestamp",
          label: "Update vote with UTC timestamp",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-va-switch-status-for-a-partner",
          label: "Get VA switch status for a partner",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-va-switch-status-variant",
          label: "Get VA switch status (variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/update-va-switch-status",
          label: "Update VA switch status",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/update-va-switch-status-with-vph",
          label: "Update VA switch status with VPH",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-va-vote-row",
          label: "Get VA vote row",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-all-language-records",
          label: "Get all language records",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/store-language-records",
          label: "Store language records",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-language-records-by-app-page-and-lang",
          label: "Get language records by app, page, and lang",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-all-available-apps",
          label: "Get all available apps",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/store-app-language-records",
          label: "Store app language records",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-position-data-for-a-partner",
          label: "Get position data for a partner",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-position-data-variant",
          label: "Get position data (variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-public-data-from-json-file",
          label: "Get public data from JSON file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-public-data-variant-from-json-file",
          label: "Get public data (variant, from JSON file)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dbrapi/get-user-data-by-partner-id",
          label: "Get user data by partner id",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
