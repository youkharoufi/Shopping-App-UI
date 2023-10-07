import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromCart from './cart.reducers';
import * as CartSelectors from './cart.selectors';
import { addCartProductQuantity, createCart, getCart, getCartItems, getCartProductCount } from './cart.actions';

@Injectable({ providedIn: 'root' })
export class CartFacade {

  currentCart$ = this.store.pipe(select(CartSelectors.getCurrentCart));
  createdCart$ = this.store.pipe(select(CartSelectors.getCreatedCart));
  count$ = this.store.pipe(select(CartSelectors.getCartCount));
  cartItems$ = this.store.pipe(select(CartSelectors.getCartItems))

  constructor(private store: Store<fromCart.CartPartialState>) { }

  getCart(userId:string){
    this.store.dispatch(getCart({userId}))
  }

  productCount(userId: string, cartId: number){
    this.store.dispatch(getCartProductCount({userId, cartId}))
  }

  createCart(userId: string){
    this.store.dispatch(createCart({userId}))
  }

  addProductQuantity(productId: number, userId: string, newQuantity:number) {
    this.store.dispatch(addCartProductQuantity({productId, userId, newQuantity}))
  }

  getCartItems(cartId:number) {
    this.store.dispatch(getCartItems({cartId}))
  }


}
