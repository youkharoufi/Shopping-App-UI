import { createCart } from './cart.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, State, cartAdapter } from './cart.reducers';


// Lookup the 'Figure' feature state managed by NgRx
export const getCartState = createFeatureSelector<State>(CART_FEATURE_KEY);



export const getCurrentCart = createSelector(
  getCartState,
  (state: State) => state.currentCart
);

export const getCreatedCart = createSelector(
  getCartState,
  (state: State) => state.createdCart
);

export const getCartCount = createSelector(
  getCartState,
  (state: State) => state.count
);

export const getCartError = createSelector(
  getCartState,
  (state: State) => state.error
);

