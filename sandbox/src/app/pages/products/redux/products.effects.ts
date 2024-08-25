import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as prodActions from "./products.actions";
import { concatMap, map } from "rxjs";
import { AppHttpService } from "../../../../api/app.service";

@Injectable()
export class ProductsEffects {
    loadProducts$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(prodActions.loadProducts),
                concatMap(() => this.http.findAllProducts()),
                map(products => prodActions.productsLoaded({products}))
                )
            )
    

    constructor(private actions$: Actions, private http: AppHttpService) {}
}