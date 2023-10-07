import { Component } from '@angular/core';
import { CartFacade } from '@shopping-app-ui/store';

@Component({
  selector: 'shopping-app-ui-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {


  constructor(private cartFacade: CartFacade){}


  
}
