import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { addToCart, filterProducts, getAllProducts, getOneProduct } from './products.actions';
import * as fromProducts from './products.reducers';
import * as ProductSelectors from './products.selectors';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {

  products$ = this.store.pipe(select(ProductSelectors.getAllProducts));
  getOneProduct$ = this.store.pipe(select(ProductSelectors.getOneProduct));
  filteredProducts$ = this.store.pipe(select(ProductSelectors.getFilteredProducts));

  constructor(private store: Store<fromProducts.ProductPartialState>) { }

  getAllProducts() {
    this.store.dispatch(getAllProducts());
  }

  getOneProduct(productId: string) {
    this.store.dispatch(getOneProduct({ productId }));
  }

  addToCart(productId: number, userId: string, quantity: number) {
    this.store.dispatch(addToCart({ productId, userId, quantity }));
  }

  filterProducts(name: string) {
    this.store.dispatch(filterProducts({ name }));
  }

}
