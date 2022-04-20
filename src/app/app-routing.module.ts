import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemListComponent} from "./flux-rss/item-list/item-list.component";
import {ItemComponent} from "./flux-rss/item/item.component";

const routes: Routes = [
   {path: '',component: ItemListComponent},
   {path: 'item',component: ItemComponent}
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
