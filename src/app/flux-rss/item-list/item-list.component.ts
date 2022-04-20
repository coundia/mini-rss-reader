import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Item} from "../../core/models/item/item.model";
import {FluxRssReaderService} from "../../core/services/flux-rss-reader.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  $items!: Observable<Item[]> ;
  item!: Item;

  constructor(private fluxRssReaderService:FluxRssReaderService) { }

  ngOnInit(): void {
    // this.$items=
     this.fluxRssReaderService.getItems().pipe(
        map(item =>{
          console.log(item._embedded.items)
        })
    ).subscribe();
  }

}
