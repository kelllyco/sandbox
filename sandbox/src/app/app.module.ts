import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './pages/products/redux/products.effects';
import { AppHttpService } from '../api/app.service';
import { HttpClientModule } from '@angular/common/http';
import { prodReducer } from './pages/products/redux/products.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule)
  }
  ,
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ productsStore: prodReducer}, {
      runtimeChecks: {
        strictStateImmutability: true, // state in store is never accidentally mutated by app code
        strictActionImmutability: true, // actions cannot be mutated either, important for most dev tools (no good reason to mutate it)
        strictActionSerializability: true, // ensures actions are serializable (ie no date object)
        strictStateSerializability: true // ensures states in store are always serializable (useful when storing state locally)
      }
    }),
    EffectsModule.forRoot([ProductsEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [AppHttpService],
  bootstrap: [AppComponent]
})
export class AppModule{}
