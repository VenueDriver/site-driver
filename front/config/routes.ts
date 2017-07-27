import { SitePage } from "../pages/site/script";
import { IndexPage } from "../pages/index/script";
import { CellBuilder } from "../pages/cell-builder/script";

module.exports = [
  { path: '', component: IndexPage  },
  { path: 'site/:domain', component: SitePage },
  { path: 'cell-builder', component: CellBuilder }
];
