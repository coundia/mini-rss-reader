import {Component} from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-rss-reader';
  constructor() {
    console.log("URI STATUS : ",environment.URI_STATUS);
  }
}
