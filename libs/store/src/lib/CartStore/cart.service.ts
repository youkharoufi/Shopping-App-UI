import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../Models/cart';
import { CartItems } from '../Models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  getCart(userId:string): Observable<Cart> {

    return this.http.get<Cart>(this.baseUrl + "cart/"+userId);
  }

  productCount(userId: string, cartId: number): Observable<number> {

    return this.http.get<number>(this.baseUrl + "cart/product-count/"+userId+"/"+cartId);
  }

  createCart(userId: string): Observable<Cart> {

    return this.http.post<Cart>(this.baseUrl + "cart/assign-new-cart-to-user/"+userId, userId);
  }

  changeProductQuantity(itemId:number, newQuantity:number): Observable<CartItems> {

    return this.http.post<CartItems>(this.baseUrl + "cart/change-quantity-of-a-product/"+itemId+"/"+newQuantity, {itemId, newQuantity});
  }

  getCartItems(cartId:number): Observable<CartItems[]> {

    return this.http.get<CartItems[]>(this.baseUrl + "cart/get-all-cart-items/"+cartId);
  }

  getCartTotal(cartId:number): Observable<number> {

    return this.http.get<number>(this.baseUrl + "cart/get-cart-total/"+cartId);
  }


}
