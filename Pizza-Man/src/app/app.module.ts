import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuCartComponent } from './menu/menu-cart/menu-cart.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { MenuService } from './menu.service';
import { PaymentComponent } from './payment/payment.component';

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
    PaymentComponent
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
