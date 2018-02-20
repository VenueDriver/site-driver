import { GeneratorLayoutHorizontalCards } from "./layouts/cards-horizontal/script";
import { GeneratorLayoutVerticalCards } from "./layouts/cards-vertical/script";
import { GeneratorLayoutTable } from "./layouts/table/script";
import { GeneratorLayoutSidebar } from "./layouts/sidebar/script";
declare const _default: {
    name: string[];
    ngComponent: {
        'Default': typeof GeneratorLayoutTable;
        'Table': typeof GeneratorLayoutTable;
        'Sidebar': typeof GeneratorLayoutSidebar;
        'Cards - Vertical': typeof GeneratorLayoutVerticalCards;
        'Cards - Horizontal': typeof GeneratorLayoutHorizontalCards;
    };
};
export default _default;
