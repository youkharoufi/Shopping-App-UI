import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProductActions from './products.actions';
import { ProductService } from './products.service';
import { of } from 'rxjs';
import { Product } from '../Models/Product';
import { Cart } from '../Models/cart';


@Injectable()
export class ProductsEffects {


  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAllProducts),
      switchMap((action) =>
        this.backend.getAllProducts().pipe(
          map((products: Product[]) =>
          ProductActions.getAllProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductActions.getAllProductsFailure({ error }))
          )

        )
      )
    )
  );

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getOneProduct),
      switchMap((action) =>
        this.backend.getProductById(action.productId).pipe(
          map((product: Product) =>
          ProductActions.getOneProductSuccess({ product })
          ),
          catchError((error) =>
            of(ProductActions.getOneProductFailure({ error }))
          )

        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addToCart),
      switchMap((action) =>
        this.backend.addToCart(action.productId, action.userId).pipe(
          map((cart: Cart) =>
          ProductActions.addToCartSuccess({ cart })
          ),
          catchError((error) =>
            of(ProductActions.addToCartFailure({ error }))
          )

        )
      )
    )
  );

    addToCartError$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.addToCartFailure),
    tap(() => {
      this.messageService.add({key:"addToCartError", severity:'error', summary: 'Error', detail: 'You need to be logged in to add a product to your cart'});
    })
  ), { dispatch: false }
);

addToCartSuccess$ = createEffect(() =>
this.actions$.pipe(
  ofType(ProductActions.addToCartSuccess),
  tap(() => {
    this.messageService.add({key:"addToCartSuccess", severity:'success', summary: 'Success', detail: 'You have added this product to your cart'});
  })
), { dispatch: false }
);



  constructor(private actions$: Actions, private backend: ProductService, private messageService: MessageService) { }

        }
