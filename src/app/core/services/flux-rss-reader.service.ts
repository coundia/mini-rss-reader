import { Injectable } from '@angular/core';
import {Item} from "../models/item/item.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class FluxRssReaderService {

   // URI : string="https://mini-rss-api.herokuapp.com/api/v1/rss/items"
   // URI_ITEMS : string="http://localhost:8080/api/v1/rss/items"
   // URI_REFRESH : string="http://localhost:8080/api/v1/rss/refresh"
  //PROD
  URI_ITEMS : string="https://mini-rss-api.herokuapp.com/api/v1/rss/items"
  URI_REFRESH : string="https://mini-rss-api.herokuapp.com/api/v1/rss/refresh"

  constructor(private http:HttpClient) { }
//recuper la liste des articles depuis le monde
  getItems(page:number,size:number):Observable<any>{
    const requestUrl = `?page=${page}&size=${size}`;
     return this.getItemsByUri(this.URI_ITEMS+requestUrl);
  }
  //refresh liste items
  refreshItems():Observable<any>{
    return this.http.get<any>(this.URI_REFRESH);
  }
  //get by Uri
  getItemsByUri(uri:string):Observable<any>{
    return this.http.get<any>(uri+"&sort=pubDate,desc");
  }

  update(item: Item) {
    console.log("updated item ")
    console.log(item)
       return this.http.patch(item?._links?.self?.href,{title:item.title,description:item.description})
  }
}
