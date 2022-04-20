import {Component, Input, OnInit} from '@angular/core';
import { Item } from 'src/app/core/models/item/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  //@Input() item!: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
