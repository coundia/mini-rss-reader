import {Injectable} from '@angular/core';
import {Item} from "../models/item/item.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FluxRssReaderService {

  private URI_REFRESH = environment.BASE_URL + environment.PATH_REFRESH;
  private URI_ITEMS = environment.BASE_URL + environment.PATH_ITEMS;
  private URI_CHANNELS = environment.BASE_URL + environment.PATH_CHANNELS;

  constructor(private http: HttpClient) {
  }

//recuper la liste des articles depuis le monde
  getItems(page: number, size: number): Observable<any> {
    const requestUrl = `?page=${page}&size=${size}`;
    return this.getItemsByUri(this.URI_ITEMS + requestUrl);
  }

  //Récupérer (charger les derniers items) le flux du RSS depuis notre api
  refreshItems(): Observable<any> {
    return this.http.get<any>(this.URI_REFRESH);
  }

  //Récupérer la liste des articles depuis notre api
  getItemsByUri(uri: string): Observable<any> {
    return this.http.get<any>(uri + "&sort=pubDate,desc");
  }

  //Mettre a jour  une liste (Item)
  update(item: Item) {
    console.log("updated item ")
    console.log(item)
    return this.http.patch(item?._links?.self?.href, {title: item.title, description: item.description})
  }

  //charger la premiere categorie  ,page et size (Channel)
  getChannelByPage(page:number,size:number): Observable<any> {

    return this.getChannelByUriAndPage(this.URI_CHANNELS,page,size)
  }

  //charger les categories by Uri (Channel)
  private getChannelByUri(uri: string): Observable<any> {
    return this.http.get<any>(uri + "&sort=pubDate,desc");
  }
  //charger les categories via uri ,page et size (Channel)
  getChannelByUriAndPage(uri: string,page:number,size:number): Observable<any> {
    const requestUrl = `?page=${page}&size=${size}`;
    return this.getChannelByUri(this.URI_CHANNELS+requestUrl)
  }

}
