import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/page/home/home.component';
import { FilterProductComponent } from './component/page/filter-product/filter-product.component';
import { NewsComponent } from './component/page/news/news.component';
import { ProductDetailComponent } from './component/common/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'product-detail',
    component: ProductDetailComponent
  },

  {
    path: 'news',
    component: NewsComponent
  },

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'product',
    component: FilterProductComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
