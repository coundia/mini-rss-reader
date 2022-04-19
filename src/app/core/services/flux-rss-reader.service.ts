import { Injectable } from '@angular/core';
import {Item} from "../models/item/item.model";
import {Observable} from "rxjs";
import * as http from "http";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FluxRssReaderService {

   URI : string="https://www.lemonde.fr/rss/en_continu.xml"

  constructor(private http:HttpClient) { }
//recuper la liste des articles depuis le monde
  getItems():Observable<Item[]>{
     //todo
     return this.http.get<Item[]>(this.URI);

  }

}
