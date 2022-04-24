import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemListComponent} from "./flux-rss/item-list/item-list.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: '', component: ItemListComponent},
  {path: 'about', component: AboutComponent}
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
export class AppRoutingModule {
}
