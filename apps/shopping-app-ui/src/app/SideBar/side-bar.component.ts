import { Component } from '@angular/core';

@Component({
  selector: 'shopping-app-ui-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {

  showClothes = false;

  openSubMenu: number | null = null; // This will keep track of which submenu is open, if any.


}
