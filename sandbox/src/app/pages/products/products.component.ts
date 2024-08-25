import { Component, OnInit } from '@angular/core';
import * as prodActions from "./redux/products.actions"
import { Store } from '@ngrx/store';
import { product } from './products.model';
import { AppState, ProdState, selectAllProducts } from './redux/products.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products$: Observable<product[]> | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(prodActions.loadProducts());
    this.products$ = this.store.select(selectAllProducts);
  }
}
