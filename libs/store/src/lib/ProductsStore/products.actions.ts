import { createAction, props } from "@ngrx/store";
import { Product } from '../Models/Product';
import { Cart } from "../Models/cart";



export enum ProductsActionsTypes {

  GET_ALL_PRODUCTS = '[Products] Get All Products',
  GET_ALL_PRODUCTS_SUCCESS = '[Products/API] Get All Products Success',
  GET_ALL_PRODUCTS_ERROR = '[Products/API] Get All Products Failure',

  GET_ONE_PRODUCT = '[Products] Get One Product',
  GET_ONE_PRODUCT_SUCCESS = '[Products/API] Get One Product Success',
  GET_ONE_PRODUCT_ERROR = '[Products/API] Get One Product Failure',

  ADD_TO_CART = '[Products] Add To Cart',
  ADD_TO_CART_SUCCESS = '[Products/API] Add To Cart Success',
  ADD_TO_CART_ERROR = '[Products/API] Add To Cart Failure',
}


export const getAllProducts = createAction(
  ProductsActionsTypes.GET_ALL_PRODUCTS
);

export const getAllProductsSuccess = createAction(
  ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const getAllProductsFailure = createAction(
  ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR,
  props<{ error: Error }>()
);

export const getOneProduct = createAction(
  ProductsActionsTypes.GET_ONE_PRODUCT,
  props<{ productId: string }>()
);

export const getOneProductSuccess = createAction(
  ProductsActionsTypes.GET_ONE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const getOneProductFailure = createAction(
  ProductsActionsTypes.GET_ONE_PRODUCT_ERROR,
  props<{ error: Error | any }>()
);

export const addToCart = createAction(
  ProductsActionsTypes.ADD_TO_CART,
  props<{ productId: number, userId: string }>()
);

export const addToCartSuccess = createAction(
  ProductsActionsTypes.ADD_TO_CART_SUCCESS,
  props<{ cart: Cart }>()
);

export const addToCartFailure = createAction(
  ProductsActionsTypes.ADD_TO_CART_ERROR,
  props<{ error: Error | any }>()
);

