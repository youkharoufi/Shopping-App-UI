import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CartActions from './cart.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Cart } from '../Models/cart';

export const CART_FEATURE_KEY = 'cart-key';

export interface State extends EntityState<Cart> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error;
  currentCart?:Cart;
  createdCart?: Cart;
}

export interface CartPartialState {
  readonly [CART_FEATURE_KEY]: State;
}

export const cartAdapter: EntityAdapter<Cart> =
  createEntityAdapter<Cart>();

export const initialState: State = cartAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});


export const productsReducer = createReducer(
  initialState,


  on(CartActions.getCart, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(CartActions.getCartSuccess, (state, { currentCart }) =>
    ({ ...state, loaded: true, currentCart })
  ),
  on(CartActions.getCartFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(CartActions.createCart, (state, { productId, userId }) => ({
    ...state,
    loaded: false,
    error: undefined,
    productId,
    userId
  })),
  on(CartActions.createCartSuccess, (state, { createdCart }) =>
    ({ ...state, loaded: true, createdCart })
  ),
  on(CartActions.createCartFailure, (state, { error }) => ({
    ...state,
    error,
  })),


);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
