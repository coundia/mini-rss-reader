import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  changerThemeFromCtrl = new FormControl(false);
  @HostBinding('class') className = '';
  isDark = false;

  constructor(private overlay: OverlayContainer) {
  }

  ngOnInit(): void {
    this.changerThemeFromCtrl.valueChanges.subscribe((valeurClickToggle) => {
      const darkClassName = 'my-dark-theme';
      this.className = valeurClickToggle ? darkClassName : '';
      this.isDark = !this.isDark;
      if (valeurClickToggle) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

}
