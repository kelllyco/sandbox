import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { product } from "../products.model";
import * as prodActions from "./products.actions";

export interface ProdState {
    products: product[];
}

export const initProdState: ProdState = {
    products: [],
};

export const prodReducer = createReducer(
    initProdState,

    on(prodActions.productsLoaded, (state, action) => {
        console.log(action.products);
        return {
            ...state,
            products: action.products
        }
    })
);