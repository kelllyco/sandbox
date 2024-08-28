import { Component, OnInit } from '@angular/core';
import * as prodActions from "./redux/products.actions"
import { Store } from '@ngrx/store';
import { product } from './products.model';
import { AppState, ProdState, selectAllProducts, selectLoading } from './redux/products.reducer';
import { Observable, filter, isEmpty, take } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products$: Observable<product[]> = this.store.select(selectAllProducts);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.products$.pipe(
      take(1),
      filter(prod => prod.length === 0)
    ).subscribe(() => this.store.dispatch(prodActions.loadProducts()))
  }
}
