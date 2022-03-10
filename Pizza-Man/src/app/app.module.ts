import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { MenuListComponent } from './component/menu/menu-list/menu-list.component';
import { MenuCartComponent } from './component/menu/menu-cart/menu-cart.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { OrdersComponent } from './component/orders/orders.component';
import { CartComponent } from './component/cart/cart.component';
import { CartService } from './services/cartService/cart.service';
import { MenuService } from './services/menuService/menu.service';
import { PaymentComponent } from './component/payment/payment.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    MenuListComponent,
    MenuCartComponent,
    RegisterComponent,
    OrdersComponent,
    CartComponent,
    PaymentComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,HttpClientModule,FormsModule
  ],
  providers: [HeaderComponent,LoginComponent,MenuListComponent,CartService,MenuService,MenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
