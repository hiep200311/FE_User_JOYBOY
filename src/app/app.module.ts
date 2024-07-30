import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/common/header/header.component';
import { IonicModule } from '@ionic/angular';
import {NgOptimizedImage} from "@angular/common";
import { BannerComponent } from './component/common/banner/banner.component';
import { HomeComponent } from './component/page/home/home.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { FilterProductComponent } from './component/page/filter-product/filter-product.component';
import { NewsComponent } from './component/page/news/news.component';
import { ProductDetailComponent } from './component/page/product-detail/product-detail.component';
import { LoginPageComponent } from './component/page/login-page/login-page.component';
import { RegisterPageComponent } from './component/page/register-page/register-page.component';
import { PaymentComponent } from './component/page/payment/payment.component';
import { ShoppingCartComponent } from './component/page/shopping-cart/shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './component/page/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    HomeComponent,
    FooterComponent,
    FilterProductComponent,
    NewsComponent,
    ProductDetailComponent,
    LoginPageComponent, 
    RegisterPageComponent,
    PaymentComponent,
    RegisterPageComponent,
    ShoppingCartComponent,
    ProfileComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        IonicModule.forRoot({}),
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
