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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    HomeComponent,
    FooterComponent,
    FilterProductComponent,
    NewsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot({}),
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
