import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { CartService } from './cart.service';
import { of } from 'rxjs';
import { Product } from '../Models/Product';
import { Cart } from '../Models/cart';


@Injectable()
export class CartEffects {


  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCart),
      switchMap((action) =>
        this.backend.getCart(action.userId).pipe(
          map((currentCart: Cart) =>
          CartActions.getCartSuccess({ currentCart })
          ),
          catchError((error) =>
            of(CartActions.getCartFailure({ error }))
          )

        )
      )
    )
  );

  productCount$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.getCartProductCount),
    switchMap((action) =>
      this.backend.productCount(action.userId, action.cartId).pipe(
        map((count: number) =>
        CartActions.getCartProductCountSuccess({ count })
        ),
        catchError((error) =>
          of(CartActions.getCartProductCountFailure({ error }))
        )

      )
    )
  )
);

createCount$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.createCart),
    switchMap((action) =>
      this.backend.createCart(action.userId).pipe(
        map((createdCart: Cart) =>
        CartActions.createCartSuccess({ createdCart })
        ),
        catchError((error) =>
          of(CartActions.createCartFailure({ error }))
        )

      )
    )
  )
);

addProductQuantity$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.addCartProductQuantity),
    switchMap((action) =>
      this.backend.addProductQuantity(action.productId, action.userId, action.newQuantity).pipe(
        map((cart: Cart) =>
        CartActions.addCartProductQuantitySuccess({ cart })
        ),
        catchError((error) =>
          of(CartActions.addCartProductQuantityFailure({ error }))
        )

      )
    )
  )
);





  constructor(private actions$: Actions, private backend: CartService) { }

        }
