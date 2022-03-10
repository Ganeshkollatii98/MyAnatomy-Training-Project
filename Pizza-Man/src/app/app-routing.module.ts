import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OrdersComponent } from './component/orders/orders.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"menu",component:MenuComponent},
  {path:"cart",component:CartComponent},
  {path:"customer/orders",component:OrdersComponent},
  {path:"payment",component:PaymentComponent},
  {path:"**",component:NotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
