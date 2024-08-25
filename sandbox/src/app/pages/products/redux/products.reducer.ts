import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { product } from "../products.model";
import * as prodActions from "./products.actions";

export interface ProdState {
    products: product[];
    loading: boolean;
}

// TODO move this out
export interface AppState {
    productsState: ProdState;
}

export const initProdState: ProdState = {
    products: [],
    loading: true,
};

export const prodReducer = createReducer(
    initProdState,

    on(prodActions.productsLoaded, (state, action) => {
        return {
            ...state,
            products: action.products,
            loading: false,
        }
    })
);

export const selectProductsState = createFeatureSelector<ProdState>('productsStore');

export const selectAllProducts = createSelector(
    selectProductsState,
    (state: ProdState) => state.products

);

export const selectLoading = createSelector(
    selectProductsState,
    (state: ProdState) => state.loading
)