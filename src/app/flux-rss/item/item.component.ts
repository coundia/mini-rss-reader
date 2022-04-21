import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../../core/models/item/item.model";
import {FluxRssReaderService} from "../../core/services/flux-rss-reader.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemComponent>,
    public serviceRss: FluxRssReaderService,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ) {}

  ngOnInit(): void {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateItem(data: Item) {
   // alert(data.title)
    return this.serviceRss.update(data).subscribe(
      ()=>{
        alert("Mise à jour reussi .lien : "+data?._links?.self?.href);
        window.location.reload();
      }
    );
  }
}
