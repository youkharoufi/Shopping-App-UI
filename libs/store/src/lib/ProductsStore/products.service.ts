import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../Models/Product';
import { Cart } from '../Models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.baseUrl + "products/get-all-products");
  }

  getProductById(productId: string): Observable<Product> {

    return this.http.get<Product>(this.baseUrl + "products/get-one-product/"+productId);
  }

  addToCart(productId: number, userId: string, quantity:number): Observable<Cart> {

    return this.http.post<Cart>(this.baseUrl + "products/add-to-cart/"+productId+"/"+userId+"/"+quantity, {productId, userId, quantity});
  }


}
