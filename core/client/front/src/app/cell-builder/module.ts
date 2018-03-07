import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { CellBuilderRoutingModule } from './routing';
import { CellBuilderPage } from './page/component';

@NgModule({
    declarations: [CellBuilderPage],
    imports: [CommonModule,CellBuilderRoutingModule]
})

export class CellBuilderModule {}
