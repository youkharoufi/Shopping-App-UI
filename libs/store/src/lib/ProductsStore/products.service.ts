import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../Models/Product';

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


}
