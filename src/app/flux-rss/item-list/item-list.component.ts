import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of} from "rxjs";
import {map, take, tap} from 'rxjs/operators';
import {Item} from "../../core/models/item/item.model";
import {FluxRssReaderService} from "../../core/services/flux-rss-reader.service";


import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {catchError, startWith, switchMap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {ItemComponent} from "../item/item.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  $items!: Observable<Item[]>;
  item!: Item;
  items!: Item[];

  //var mat

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //var mat end
  page: number = 0;
  size: number = 5;
  links!: ApiLink;
  pages!: ApiPage;

  constructor(public dialog: MatDialog,private fluxRssReaderService: FluxRssReaderService) {
  }

  ngOnInit(): void {

    this.chargerPageByNum(this.page,this.size);

  }
//charger les nouveaux articles
  refleshItems() {
    this.fluxRssReaderService.refreshItems().subscribe(
      // take(1),
      () => {
        window.location.reload();
      })
  }
//charger une page
  chargerPage(uri: string) {
    this.fluxRssReaderService.getItemsByUri(uri)
      .pipe(
        take(1),
        map(item => {
            this.itemBuilder(item)
          }
        ),
        tap(() => console.log(this.items))
      ).subscribe();
  }

  /***
   *  Maj la vue
   * @param item
   */
  itemBuilder(item: any) {
    console.log("********* itemBuilder **************")
    console.log(item);
    this.items = item?._embedded?.items;
    this.links = {
      first: item?._links?.first?.href,
      last: item?._links?.last?.href,
      next: item?._links?.next?.href,
      prev: item?._links?.prev?.href,
      profile: item?._links?.profile?.href,
      search: item?._links?.search?.href,
      self: item?._links?.self?.href,
    }
    //bind page
    this.pages = item?.page;

    this.page = item?.page?.number;
    this.size = item?.page?.size;
  }

  chargerNextPage() {
    this.chargerPage(this.links?.next);
  }

  chargerPrevPage() {
    this.chargerPage(this.links?.prev);
  }

  paginatorBuilder() {
    if(this.pages.totalPages<3)
    return new Array(this.pages.totalPages);
    else
    return new Array(3);
  }

  //charger page by num
  //charger une page
  chargerPageByNum(page: number,size:number): void {
    this.fluxRssReaderService.getItems(page, size)
      .pipe(
        take(1),
        map(item => {
            this.itemBuilder(item)
          }
        ),
        tap(() => console.log(this.items))
      ).subscribe();
  }

  checkFin() {
     return this.pages?.number === this.pages?.totalPages;
  }
  //edit
  openDialog(item:Item): void {
    const dialogRef = this.dialog.open(ItemComponent, {
        width: '100%',
        height: '100%',
      data: {...item},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

//ApiPage
export interface ApiPage {
  number: number,
  size: number,
  totalElements: number,
  totalPages: number,
}

//ApiPage
export interface ApiLink {
  first: string,
  last: string,
  next: string,
  prev: string,
  profile: string,
  search: string,
  self: string,
}
