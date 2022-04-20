import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of} from "rxjs";
import {map, take} from 'rxjs/operators';
import {Item} from "../../core/models/item/item.model";
import {FluxRssReaderService} from "../../core/services/flux-rss-reader.service";


import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {catchError, startWith, switchMap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {

  $items!: Observable<Item[]> ;
  item!: Item;

  //var mat
  displayedColumns: string[] = ['title','description','pubDate'];
  itemRessource!: ItemRessource | null;
  data: Item[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //var mat end
  constructor(private fluxRssReaderService:FluxRssReaderService,private _httpClient: HttpClient) { }
  ngOnInit(): void {
    // this.$items=
  }
  //method for mat
  ngAfterViewInit() {
    this.itemRessource = new ItemRessource(this.fluxRssReaderService);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.itemRessource!.getItems(
            this.sort.active, this.sort.direction, this.paginator.pageIndex)
            .pipe(catchError(() => of(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.total_count;
          return data.items;
        })
      ).subscribe(data => this.data = data);
  }

  refleshItems() {
    this.fluxRssReaderService.refreshItems().subscribe(
      take(1)
    );
  }
}

export interface ItemApi {
  items: Item[];
  total_count: number;
}

//
export class ItemRessource {
  constructor(private fluxRssReaderService: FluxRssReaderService) {}

  getItems(sort: string, order: SortDirection, page: number): Observable<ItemApi> {
    return this.fluxRssReaderService.getItems(page,5).pipe(
      map(item =>(
        {
          items: item?._embedded.items,
          total_count: item?.page.size,
        }
      ))
    )

    ;
  }
}



