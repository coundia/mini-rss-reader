import { Injectable } from '@angular/core';
import {Item} from "../models/item/item.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {SortDirection} from "@angular/material/sort";
import {ItemApi} from "../../flux-rss/item-list/item-list.component";

@Injectable({
  providedIn: 'root'
})
export class FluxRssReaderService {

   // URI : string="https://mini-rss-api.herokuapp.com/api/v1/rss/items"
   // URI_ITEMS : string="http://localhost:8080/api/v1/rss/items"
   // URI_REFRESH : string="http://localhost:8080/api/v1/rss/refresh"
  // URI_STATUS : string="http://localhost:8080/api/v1/rss/status"
  //PROD
  URI_ITEMS : string="https://mini-rss-api.herokuapp.com/api/v1/rss/items"
  URI_STATUS : string="https://mini-rss-api.herokuapp.com/api/v1/rss/status"
  URI_REFRESH : string="https://mini-rss-api.herokuapp.com/api/v1/rss/refresh"

  constructor(private http:HttpClient) { }
//recuper la liste des articles depuis le monde
  getItems(page:number,size:number):Observable<any>{
    const requestUrl = `?page=${page}&siz=${size}`;
     return this.http.get<any>(this.URI_ITEMS+requestUrl);
  }
  /*
  getItemsBis(sort: string, order: SortDirection, page: number){
    return this.getItems(sort, order, page):
    Observable<ItemApi> {
      return this.fluxRssReaderService.getItems(page,5).pipe(
        map(item =>(
          {
            items: item?._embedded.items,
            total_count: item?._embedded.items.length,
          }
        ))
      )


    }

  }
  */
}
