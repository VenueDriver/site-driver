import { SitePage } from "../pages/site/script";
import { IndexPage } from "../pages/index/script";

module.exports = [
  { path: '', component: IndexPage  },
  { path: 'site/:domain', component: SitePage }
];
