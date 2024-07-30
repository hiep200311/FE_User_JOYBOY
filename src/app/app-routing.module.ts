import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/page/home/home.component';
import { FilterProductComponent } from './component/page/filter-product/filter-product.component';
import { NewsComponent } from './component/page/news/news.component';
import { ProductDetailComponent } from './component/page/product-detail/product-detail.component';
import { LoginPageComponent } from './component/page/login-page/login-page.component';
import { RegisterPageComponent } from './component/page/register-page/register-page.component';
import { ShoppingCartComponent } from './component/page/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './component/page/payment/payment.component';
import { ProfileComponent } from './component/page/profile/profile.component';
import { AuthGuard } from './controller/auth-guard/auth.guard';


const routes: Routes = [
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },

  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },

  {
    path: 'news',
    component: NewsComponent
  },

  {
    path: 'home',
    component: HomeComponent 
  },

  {
    path: 'payment',
    component: PaymentComponent 
  },

  {
    path: 'login',
    component: LoginPageComponent
  },

  {
    path: 'register',
    component: RegisterPageComponent
  },

  {
    path: 'payment',
    component: PaymentComponent
  },

  {
    path: 'product',
    component: FilterProductComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
