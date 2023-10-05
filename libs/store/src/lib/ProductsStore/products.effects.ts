import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ProductActions from './products.actions';
import { ProductService } from './products.service';
import { of } from 'rxjs';
import { Product } from '../Models/Product';


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



  constructor(private actions$: Actions, private backend: ProductService) { }

        }
