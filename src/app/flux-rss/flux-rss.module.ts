import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from "@angular/material/sort";

import {MatPaginatorModule} from '@angular/material/paginator';


import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
         ItemComponent,
        ItemListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class FluxRssModule { }
