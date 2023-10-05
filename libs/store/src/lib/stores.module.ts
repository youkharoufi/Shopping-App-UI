import { PRODUCTS_FEATURE_KEY } from './ProductsStore/products.reducers';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountFacade } from './Account.Store/account.facade';
import { StoreModule } from '@ngrx/store';


import * as fromAccounts from './Account.Store/account.reducers';
import { AccountEffects } from './Account.Store/account.effects';
import { ACCOUNT_API_ENDPOINT } from './Account.Store/account.token';
import { EffectsModule } from '@ngrx/effects';

import * as fromProducts from './ProductsStore/products.reducers';
import { ProductsEffects } from './ProductsStore/products.effects';
import { PRODUCT_API_ENDPOINT } from './ProductsStore/products.token';

import { PrimeNgZeModule } from '@shopping-app-ui/prime-ng';

@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature(
      fromAccounts.ACCOUNT_FEATURE_KEY,
      fromAccounts.reducer
    ),
    EffectsModule.forFeature([AccountEffects]),

    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),

    PrimeNgZeModule
    ],
    providers: [
      MessageService,
      { provide: ACCOUNT_API_ENDPOINT, useValue: '' },
      { provide: PRODUCT_API_ENDPOINT, useValue: '' },
    ]
})
export class StoresModule {}
