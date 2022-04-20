import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit , AfterViewInit{
  //@Input() item!: Item;

  //
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
