import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { CartService } from './cart.service';
import { of } from 'rxjs';
import { Cart } from '../Models/cart';
import { CartItems } from '../Models/cartItems';
import { MessageService } from 'primeng/api';


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

changeProductQuantity$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.addCartProductQuantity),
    switchMap((action) =>
      this.backend.changeProductQuantity(action.itemId, action.newQuantity).pipe(
        map((cartItem: CartItems) =>
        CartActions.addCartProductQuantitySuccess({ cartItem })
        ),
        catchError((error) =>
          of(CartActions.addCartProductQuantityFailure({ error }))
        )

      )
    )
  )
);

getCartItems$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.getCartItems),
    switchMap((action) =>
      this.backend.getCartItems(action.cartId).pipe(
        map((cartItems: CartItems[]) =>
        CartActions.getCartItemsSuccess({ cartItems })
        ),
        catchError((error) =>
          of(CartActions.getCartItemsFailure({ error }))
        )

      )
    )
  )
);

getCartTotal$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.getCartTotal),
    switchMap((action) =>
      this.backend.getCartTotal(action.cartId).pipe(
        map((total: number) =>
        CartActions.getCartTotalSuccess({ total })
        ),
        catchError((error) =>
          of(CartActions.getCartTotalFailure({ error }))
        )

      )
    )
  )
);

deleteCartItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.deleteCartItem),
    switchMap((action) =>
      this.backend.deleteCartItem(action.itemId).pipe(
        map(() =>
        CartActions.deleteCartItemSuccess()
        ),
        catchError((error) =>
          of(CartActions.deleeCartItemFailure({ error }))
        )

      )
    )
  )
);




  constructor(private actions$: Actions, private backend: CartService, private messageService : MessageService) { }

        }
