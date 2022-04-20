import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';

import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [

    ItemComponent,
        ItemListComponent
  ],
  imports: [
    CommonModule,
     MatTableModule
  ]
})
export class FluxRssModule { }
