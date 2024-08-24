import { createAction, props } from "@ngrx/store";
import { product } from "../products.model";

export const loadProducts = createAction(
    "[Products Page] Load Products" // ehh very command like rather than event
)

export const productsLoaded = createAction(
    "[Products Page] Products Loaded",
    props<{products: product[]}>()
);