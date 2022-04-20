import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';



@NgModule({
  declarations: [
  
    ItemComponent,
        ItemDetailsComponent,
        ItemListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FluxRssModule { }
