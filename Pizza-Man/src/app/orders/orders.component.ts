import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Recipe } from '../menu/recipe';
import { OrdersService } from '../orders.service';
import { PaymentRestService } from '../payment-rest.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  cartRecipes: Recipe[] = [];
  userOrders: any;
  user:any;
  isLoggedIn=false;
  constructor(private menuService: MenuService, private orderService: OrdersService,private paymentService:PaymentRestService) {
    this.getOrders();
    this.getUserDetails();
    this.isLoggedIn=localStorage.getItem('username')=='false'?false:true
  }

  ngOnInit(): void {

  }
  ngDoCheck() {
    this.cartRecipes = this.menuService.getRecipesFromMenu().filter((recipe) => recipe.getRecipeQty > 0);
    console.log(this.cartRecipes);
  }
  getUserDetails(){
    let email = localStorage.getItem('username');
    this.paymentService.getDetailsByEmail(email).subscribe(
      (data)=>{
          this.user=data;
          console.log(this.user);
          
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
   
  getOrders() {
    let email = localStorage.getItem('username');
    if (email != "false") {
      this.orderService.getOrdersByUsername(email).subscribe(
        (data) => {
          this.userOrders = data;          
          console.log("please check this", data);
        },
        (error) => {
          console.log(error);

        }
      )

    }
    
  }
  covertToString(date:any):any{
      var d=new Date(parseInt(date));
      return d.toUTCString();
  }


}
