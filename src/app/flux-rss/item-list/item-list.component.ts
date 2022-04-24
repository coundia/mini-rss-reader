import {Component, OnInit, ViewChild} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {Item} from "../../core/models/item/item.model";
import {FluxRssReaderService} from "../../core/services/flux-rss-reader.service";


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ItemComponent} from "../item/item.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiPage} from "../../core/interfaces/ApiPage.interface";
import {ApiLink} from "../../core/interfaces/ApiLink.interface";
import {Channel} from "../../core/models/item/channel.model";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  item!: Item;
  items!: Item[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //var mat end
  page: number = 0;
  size: number = 6;
  links: ApiLink = {
    first: "",
    last: "",
    next: "",
    prev: "",
    profile: "",
    search: "",
    self: "",
  };
  nombreColonneDefault = 2;
  pages: ApiPage = {
    number: 0,
    size: 5,
    totalElements: 5,
    totalPages: 1,
  };
  chargementActive: boolean = true;
  //chanels
  defaultChannel: { imageUrl: string; link: string; description: string; language: string; title: string } = {
    description: "Le Monde.fr - 1er site d’information.",
    imageUrl: "/logo.png",
    language: "fr",
    link: "https://www.lemonde.fr/rss/en_continu.xml",
    title: "Le Monde.fr - Actualités et Infos en France et dans le monde"
  };
  private channels: Channel[] | undefined;


  constructor(public dialog: MatDialog, private fluxRssReaderService: FluxRssReaderService, private responsiveService: BreakpointObserver) {
  }

  isMobile = false;

  ngOnInit(): void {
    console.log("****** on init ***")

    console.log('HandsetLandscape ' + Breakpoints.Medium);

      this.responsiveService.observe([
              Breakpoints.XSmall,
              Breakpoints.Small,

            ])
      .subscribe(result => {
        this.isMobile = result.matches;
      });


    //recuperer les articles
    this.chargerPageByNum(this.page, this.size);
    //recuperer les categories
    this.fluxRssReaderService.getChannelByPage(this.page, this.size).pipe(
      take(1),
      map(res => {
        this.channels = this.channelBuilder(res);
      }),
      tap(
        () => {
          console.log(this.channels);
          if (this.channels != undefined) {
            this.defaultChannel = this.channels[0];
          }
        }
      )
    ).subscribe();


  }

//charger les nouveaux articles
  refleshItems() {
    this.fluxRssReaderService.refreshItems().subscribe(
      // take(1),
      () => {
        this.chargementActive = false;
        window.location.reload();
      })
  }

//charger une page
  chargerPage(uri: string) {
    this.fluxRssReaderService.getItemsByUri(uri)
      .pipe(
        take(1),
        map(ressource => {
            this.itemBuilder(ressource)
          }
        ),

        tap(() => {
          this.chargementActive = false;
        })
      ).subscribe();
  }

  /***
   *  Parser les items recu depuis l'api
   * @param item
   */
  itemBuilder(ressource: any) {

    //listes des articles recupere
    this.items = ressource?._embedded?.items;
    this.links = {
      first: ressource?._links?.first?.href,
      last: ressource?._links?.last?.href,
      next: ressource?._links?.next?.href,
      prev: ressource?._links?.prev?.href,
      profile: ressource?._links?.profile?.href,
      search: ressource?._links?.search?.href,
      self: ressource?._links?.self?.href,
    }
    //bind page
    this.pages = ressource?.page;

    this.page = ressource?.page?.number;
    this.size = ressource?.page?.size;
  }

  chargerNextPage() {
    this.chargerPage(this.links?.next);
  }

  chargerPrevPage() {
    this.chargerPage(this.links?.prev);
  }

  paginatorBuilder() {
    if (this.pages.totalPages < 3)
      return new Array(this.pages.totalPages);
    else
      return new Array(3);
  }

  //charger page by num
  //charger une page
  chargerPageByNum(page: number, size: number): void {
    this.fluxRssReaderService.getItems(page, size)
      .pipe(
        take(1),
        map(item => {
            this.itemBuilder(item)
          }
        ),
        tap(v => this.chargementActive = false)
      ).subscribe();
  }

  checkFin() {
    return this.pages?.number === this.pages?.totalPages;
  }

  //modal pour modifier un article
  openDialog(item: Item): void {
    const dialogRef = this.dialog.open(ItemComponent, {
      width: '100%',
      height: '100%',
      data: {...item},
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

//lancer le spiner
  onChargement(): boolean {
    //verifier autres choses si necessaire
    return this.chargementActive;
  }

  //channelBuilder
  /***
   *  Parser les channels recu depuis l'api
   * @param item
   */
  channelBuilder(ressource: any): Channel[] {
    //liste des channels
    return this.channels = ressource?._embedded?.channels;

  }

  getShortTitle(title: string) {
   return title.substring(0, 11)+"...";
  }
//vue de l'application
  changerVue() {
    console.log(this.nombreColonneDefault)
    if( this.nombreColonneDefault<=3)
      this.nombreColonneDefault=this.nombreColonneDefault-1;
    if( this.nombreColonneDefault ==0)
      this.nombreColonneDefault=3;

  }
}


