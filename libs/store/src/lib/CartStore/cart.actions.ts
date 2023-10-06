import { createAction, props } from "@ngrx/store";
import { Cart } from "../Models/cart";



export enum CartActionsTypes {

  GET_CART = '[Cart] Get Cart',
  GET_CART_SUCCESS = '[Cart/API] Get Cart Success',
  GET_CART_ERROR = '[Cart/API] Get Cart Failure',

  CREATE_CART = '[Cart] Create Cart',
  CREATE_CART_SUCCESS = '[Cart/API] Create Cart Success',
  CREATE_CART_ERROR = '[Cart/API] Create Cart Failure',
}

export const getCart = createAction(
  CartActionsTypes.GET_CART
);

export const getCartSuccess = createAction(
  CartActionsTypes.GET_CART_SUCCESS,
  props<{ currentCart: Cart }>()
);

export const getCartFailure = createAction(
  CartActionsTypes.GET_CART_ERROR,
  props<{ error: Error }>()
);

export const createCart = createAction(
  CartActionsTypes.CREATE_CART,
  props<{ productId: string, userId: string }>()
);

export const createCartSuccess = createAction(
  CartActionsTypes.CREATE_CART_SUCCESS,
  props<{ createdCart: Cart }>()
);

export const createCartFailure = createAction(
  CartActionsTypes.CREATE_CART_ERROR,
  props<{ error: Error | any }>()
);

