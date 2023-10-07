import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../Models/cart';

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

  addProductQuantity(productId: number, userId: string, newQuantity:number): Observable<Cart> {

    return this.http.post<Cart>(this.baseUrl + "cart/add-quantity-of-a-product/"+productId+"/"+userId+"/"+newQuantity, {productId, userId, newQuantity});
  }


}
