import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loginAccount, registerAccount } from './account.actions';
import * as fromAccount from './account.reducers';
import * as AccountSelectors from './account.selectors';
import { LoginUser } from '../Models/loginUser';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountFacade {

  error$ = this.store.pipe(select(AccountSelectors.getAccountError));
  loggedUser$ = this.store.pipe(select(AccountSelectors.getLoggedUser));

  constructor(private store: Store<fromAccount.AccountPartialState>) { }

  login(loginUser: LoginUser) {
    this.store.dispatch(loginAccount({loginUser}));
  }

  register(registerUser: FormData) {
    this.store.dispatch(registerAccount({ registerUser }));
  }

}
