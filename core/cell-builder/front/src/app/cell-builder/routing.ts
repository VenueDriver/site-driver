import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CellBuilderPage } from './page/component';

const routes: Routes = [
    {
        path: '',
        component: CellBuilderPage
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CellBuilderRoutingModule { }
