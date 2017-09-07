import { SitePage } from "../pages/site/script";
import { IndexPage } from "../pages/index/script";
import { CellBuilder } from "../pages/cell-builder/script";
import { MoleculeGenerator } from "../pages/molecule-generator/script";
import { GeneratorPage } from "../pages/generator/script";
import { InstancePage } from "../pages/instance/script";


module.exports = [
  { path: '', component: IndexPage  },
  { path: 'site/:domain', component: SitePage },
  { path: 'cell-builder', component: CellBuilder },
  { path: 'molecule-generator', component: MoleculeGenerator },
  { path: 'generator/:generator_name', component: GeneratorPage },
  { path: 'instance/:id', component: InstancePage }

];
