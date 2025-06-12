// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  myApiSidebar: require('./docs/petstore/sidebar'),
  dbrApiSidebar: require('./docs/dbrapi/sidebar'),
  dbrSidebar: [
    {
      type: 'category',
      label: 'Allrates - Árfolyam letöltő',
      link: { type: 'generated-index', description: 'Az Allrates egy egyszerű eszköz, amely lehetővé teszi a felhasználók számára, hogy letöltsék a valuták árfolyamait különböző időszakokra. A letöltött adatok CSV formátumban érhetők el, és könnyen integrálhatók más alkalmazásokba vagy elemzésekbe.' },
      items: ['dbr/allrates-ratedownloader/allrates'],
    },
    {
      type: 'category',
      label: 'DBR coin óránkénti fogadó',
      link: { type: 'generated-index', description: 'A DBR coin óránkénti fogadó egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy óránkénti időközönként fogadjanak a DBR coin árfolyamára.' },
      items: ['dbr/dbr-hourly-betting/dbr_coin'],
    },
    {
      type: 'category',
      label: 'DBR motor',
      link: { type: 'generated-index', description: 'A DBR motor egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy különböző funkciókat és szolgáltatásokat használjanak a DBR ökoszisztémában.' },
      items: ['dbr/dbr-engine/dbr_engine'],
    },
    {
      type: 'category',
      label: 'DBR PP - Adatbázis műveletek',
      link: { type: 'generated-index', description: 'A DBR PP adatbázis műveletek egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy különböző adatbázis műveleteket végezzenek a DBR ökoszisztémában.' },
      items: ['dbr/dbrpp-database/dbrpp_db'],
    },
    {
      type: 'category',
      label: 'DBR PP - adatbázis figyelő',
      link: { type: 'generated-index', description: 'A DBR PP Watcher egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy figyelemmel kísérjék a DBR ökoszisztéma eseményeit és változásait.' },
      items: ['dbr/dbrpp-watcher/dbrpp_watcher'],
    },
    {
      type: 'category',
      label: 'Jutalomkioszás (h/d)',
      link: { type: 'generated-index', description: 'A DBR jutalomkiosztás egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy óránkénti és napi jutalmakat kapjanak a DBR ökoszisztémában végzett tevékenységeikért.' },
      items: ['dbr/houryl-daily-rewards/distribute'],
    },
    {
      type: 'category',
      label: 'Mobilapp Backend',
      link: { type: 'generated-index', description: 'A Mobilapp Backend egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy hozzáférjenek a mobilalkalmazás backend funkcióihoz és szolgáltatásaihoz.' },
      items: ['dbr/mobilapp-backend/mobilapp_backend'],
    },
    {
      type: 'category',
      label: 'Mobilapp Frontend',
      link: { type: 'generated-index', description: 'A Mobilapp Frontend egy olyan szolgáltatás, amely lehetővé teszi a felhasználók számára, hogy hozzáférjenek a mobilalkalmazás frontend funkcióihoz és szolgáltatásaihoz.' },
      items: ['dbr/mobilapp-frontend/mobilapp_frontend'],
    },
  ],
};

export default sidebars;
