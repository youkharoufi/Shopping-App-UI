import { Component, OnInit } from '@angular/core';
import { ApplicationUser, CartFacade } from '@shopping-app-ui/store';
import { Cart } from 'libs/store/src/lib/Models/cart';
import { CartItems } from 'libs/store/src/lib/Models/cartItems';

@Component({
  selector: 'shopping-app-ui-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit{

  productCount$ = this.cartFacade.count$;

  productCount= "0" ;

  currentCart$ = this.cartFacade.currentCart$;
  currentCart!: Cart;

  cartItems$ = this.cartFacade.cartItems$;
  cartItems!: CartItems[];

  user!: ApplicationUser;

  constructor(private cartFacade: CartFacade){}


  ngOnInit(): void{

    if(localStorage.getItem('user') !== null){
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.cartFacade.getCart(this.user.id);

      this.currentCart$.subscribe({
        next:(value?:Cart)=>{
          if(value){
            this.cartFacade.getCartItems(value.cartId);
            this.cartItems$.subscribe({
              next:(cartItems?:CartItems[])=>{
                if(cartItems) this.cartItems = cartItems;
              }
            })
            this.cartFacade.productCount(this.user.id, value!.cartId);
            this.productCount$.subscribe({
              next:(count?:number)=>{
                if(count) this.productCount = typeof(count) === undefined ? '0' : count?.toString();
              }
            })
          }
          }


      })

    }

  }
}
