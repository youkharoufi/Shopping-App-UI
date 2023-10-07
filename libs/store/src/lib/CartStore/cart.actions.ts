import { createAction, props } from "@ngrx/store";
import { Cart } from "../Models/cart";
import { CartItems } from "../Models/cartItems";



export enum CartActionsTypes {

  GET_CART = '[Cart] Get Cart',
  GET_CART_SUCCESS = '[Cart/API] Get Cart Success',
  GET_CART_ERROR = '[Cart/API] Get Cart Failure',

  CREATE_CART = '[Cart] Create Cart',
  CREATE_CART_SUCCESS = '[Cart/API] Create Cart Success',
  CREATE_CART_ERROR = '[Cart/API] Create Cart Failure',

  GET_CART_PRODUCT_COUNT = '[Cart] Get Cart Product Count',
  GET_CART_PRODUCT_COUNT_SUCCESS = '[Cart/API] Get Cart Product Count Success',
  GET_CART_PRODUCT_COUNT_ERROR = '[Cart/API] Get Cart Product Count Failure',

  ADD_QUANTITY_OF_PRODUCT = '[Cart] Add Cart Product Quantity',
  ADD_QUANTITY_OF_PRODUCT_SUCCESS = '[Cart/API] Add Cart Product Quantity Success',
  ADD_QUANTITY_OF_PRODUCT_ERROR = '[Cart/API] Add Cart Product Quantity Failure',

  GET_CART_ITEMS = '[Cart] Get Items',
  GET_CART_ITEMS_SUCCESS = '[Cart/API] Get Items Success',
  GET_CART_ITEMS_ERROR = '[Cart/API] Get Items Failure',



}

export const getCart = createAction(
  CartActionsTypes.GET_CART,
  props<{ userId: string }>()
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
  props<{ userId: string }>()
);

export const createCartSuccess = createAction(
  CartActionsTypes.CREATE_CART_SUCCESS,
  props<{ createdCart: Cart }>()
);

export const createCartFailure = createAction(
  CartActionsTypes.CREATE_CART_ERROR,
  props<{ error: Error | any }>()
);

export const getCartProductCount = createAction(
  CartActionsTypes.GET_CART_PRODUCT_COUNT,
  props<{ userId: string, cartId:number }>()
);

export const getCartProductCountSuccess = createAction(
  CartActionsTypes.GET_CART_PRODUCT_COUNT_SUCCESS,
  props<{ count: number }>()
);

export const getCartProductCountFailure = createAction(
  CartActionsTypes.GET_CART_PRODUCT_COUNT_ERROR,
  props<{ error: Error | any }>()
);

export const addCartProductQuantity = createAction(
  CartActionsTypes.ADD_QUANTITY_OF_PRODUCT,
  props<{ productId:number, userId: string, newQuantity:number }>()
);

export const addCartProductQuantitySuccess = createAction(
  CartActionsTypes.ADD_QUANTITY_OF_PRODUCT_SUCCESS,
  props<{ cart: Cart }>()
);

export const addCartProductQuantityFailure = createAction(
  CartActionsTypes.ADD_QUANTITY_OF_PRODUCT_ERROR,
  props<{ error: Error | any }>()
);

export const getCartItems = createAction(
  CartActionsTypes.GET_CART_ITEMS,
  props<{ cartId:number }>()
);

export const getCartItemsSuccess = createAction(
  CartActionsTypes.GET_CART_ITEMS_SUCCESS,
  props<{ cartItems: CartItems[] }>()
);

export const getCartItemsFailure = createAction(
  CartActionsTypes.GET_CART_ITEMS_ERROR,
  props<{ error: Error | any }>()
);
