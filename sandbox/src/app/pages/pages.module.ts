import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "home",
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AboutModule,
    HomeModule
  ]
})
export class PagesModule { }
