// IMPORT COMPONENTS
import { GeneratorLayoutHorizontalCards } from "./layouts/cards-horizontal/script";
import { GeneratorLayoutVerticalCards } from "./layouts/cards-vertical/script";
import { GeneratorLayoutTable } from "./layouts/table/script";
import { GeneratorLayoutSidebar } from "./layouts/sidebar/script";

// ASSIGN COMPONENT TO NAME
const ngComponent = {
  'Default' : GeneratorLayoutTable,
  'Table' : GeneratorLayoutTable,
  'Sidebar' : GeneratorLayoutSidebar,
  'Cards - Vertical' : GeneratorLayoutVerticalCards,
  'Cards - Horizontal' : GeneratorLayoutHorizontalCards
}

export default {
  name : Object.keys(ngComponent),
  ngComponent : ngComponent
};
