import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, State, productAdapter } from './products.reducers';


// Lookup the 'Figure' feature state managed by NgRx
export const getProductState = createFeatureSelector<State>(PRODUCTS_FEATURE_KEY);



const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getOneProduct = createSelector(
  getProductState,
  (state: State) => state.product
);

export const getAllProducts = createSelector(
  getProductState,
  (state: State) => state.products
);

export const getFilteredProducts = createSelector(
  getProductState,
  (state: State) => state.filteredProducts
);

export const getProductError = createSelector(
  getProductState,
  (state: State) => state.error
);


export const getProductEntities = createSelector(
  getProductState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProductState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getProductEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
