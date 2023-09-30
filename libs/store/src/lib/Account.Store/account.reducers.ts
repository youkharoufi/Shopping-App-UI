import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AccountActions from './account.actions';
import { ApplicationUser } from '../Models/applicationUser';
import { createReducer, on, Action } from '@ngrx/store';

export const ACCOUNT_FEATURE_KEY = 'account-key';

export interface State extends EntityState<ApplicationUser> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error;
}

export interface AccountPartialState {
  readonly [ACCOUNT_FEATURE_KEY]: State;
}

export const accountAdapter: EntityAdapter<ApplicationUser> =
  createEntityAdapter<ApplicationUser>();

export const initialState: State = accountAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});


export const accountReducer = createReducer(
  initialState,


  on(AccountActions.loginAccount, (state, { loginUser }) => ({
    ...state,
    loaded: false,
    error: undefined,
    loginUser
  })),
  on(AccountActions.loginAccountSuccess, (state, { loggedUser }) =>
    ({ ...state, loaded: true, loggedUser:loggedUser })
  ),
  on(AccountActions.loginAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(AccountActions.registerAccount, (state, { registerUser }) => ({
    ...state,
    loaded: false,
    error: undefined,
    registerUser
  })),
  on(AccountActions.registerAccountSuccess, (state, { registeredUser }) =>
    ({ ...state, loaded: true, registeredUser })
  ),
  on(AccountActions.registerAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),


);

export function reducer(state: State | undefined, action: Action) {
  return accountReducer(state, action);
}
