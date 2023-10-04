import { createAction, props } from "@ngrx/store";
import { Product } from '../Models/Product';



export enum ProductsActionsTypes {

  GET_ALL_PRODUCTS = '[Products] Get All Products',
  GET_ALL_PRODUCTS_SUCCESS = '[Products/API] Get All Products Success',
  GET_ALL_PRODUCTS_ERROR = '[Products/API] Get All Products Failure',

  GET_ONE_PRODUCT = '[Products] Get One Product',
  GET_ONE_PRODUCT_SUCCESS = '[Products/API] Get One Product Success',
  GET_ONE_PRODUCT_ERROR = '[Products/API] Get One Product Failure',
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

