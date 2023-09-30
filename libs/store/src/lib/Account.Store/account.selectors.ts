import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ACCOUNT_FEATURE_KEY, State, accountAdapter } from './account.reducers';


// Lookup the 'Figure' feature state managed by NgRx
export const getAccountState = createFeatureSelector<State>(ACCOUNT_FEATURE_KEY);



const { selectAll, selectEntities } = accountAdapter.getSelectors();


export const getLoggedUser = createSelector(
  getAccountState,
  (state: State) => state.loggedUser
);

export const getAccountError = createSelector(
  getAccountState,
  (state: State) => state.error
);

export const getAllUsers = createSelector(getAccountState, (state: State) =>
  selectAll(state)
);

export const getAccountEntities = createSelector(
  getAccountState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAccountState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAccountEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
