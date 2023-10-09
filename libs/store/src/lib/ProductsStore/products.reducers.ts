import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductsActions from './products.actions';
import { Product } from '../Models/Product';
import { createReducer, on, Action } from '@ngrx/store';

export const PRODUCTS_FEATURE_KEY = 'product-key';

export interface State extends EntityState<Product> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error;
  product?: Product;
  products?: Product[];
  filteredProducts?: Product[];
}

export interface ProductPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>();

export const initialState: State = productAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  product:undefined,
  products:undefined
});


export const productsReducer = createReducer(
  initialState,


  on(ProductsActions.getAllProducts, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(ProductsActions.getAllProductsSuccess, (state, { products }) =>
    ({ ...state, loaded: true, products })
  ),
  on(ProductsActions.getAllProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(ProductsActions.getOneProduct, (state, { productId }) => ({
    ...state,
    loaded: false,
    error: undefined,
    productId
  })),
  on(ProductsActions.getOneProductSuccess, (state, { product }) =>
    ({ ...state, loaded: true, product })
  ),
  on(ProductsActions.getOneProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(ProductsActions.addToCart, (state, { productId, userId, quantity }) => ({
    ...state,
    loaded: false,
    error: undefined,
    productId,
    userId,
    quantity
  })),
  on(ProductsActions.addToCartSuccess, (state, { cart }) =>
    ({ ...state, loaded: true, cart })
  ),
  on(ProductsActions.addToCartFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(ProductsActions.filterProducts, (state, { name }) => ({
    ...state,
    loaded: false,
    error: undefined,
    name
  })),
  on(ProductsActions.filterProductsSuccess, (state, { filteredProducts }) =>
    ({ ...state, loaded: true, filteredProducts })
  ),
  on(ProductsActions.filterProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
