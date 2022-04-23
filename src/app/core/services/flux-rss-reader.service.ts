import {Injectable} from '@angular/core';
import {Item} from "../models/item/item.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FluxRssReaderService {

  constructor(private http:HttpClient) { }
//recuper la liste des articles depuis le monde
  getItems(page:number,size:number):Observable<any>{
    const requestUrl = `?page=${page}&size=${size}`;
     return this.getItemsByUri(environment.URI_ITEMS+requestUrl);
  }
  //Récupérer (charger les derniers items) le flux du RSS depuis notre api
  refreshItems():Observable<any>{
    return this.http.get<any>(environment.URI_REFRESH);
  }
  //Récupérer la liste des articles depuis notre api
  getItemsByUri(uri:string):Observable<any>{
    return this.http.get<any>(uri+"&sort=pubDate,desc");
  }
  //Mettre a jour  une liste (Item)
  update(item: Item) {
    console.log("updated item ")
    console.log(item)
       return this.http.patch(item?._links?.self?.href,{title:item.title,description:item.description})
  }
}
