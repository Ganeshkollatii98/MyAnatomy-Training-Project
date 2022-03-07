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

  // Variable Declarations
  
  userOrders: any;
  user:any;
  isLoggedIn=false;
  constructor(private menuService: MenuService, private orderService: OrdersService,private paymentService:PaymentRestService) {
    // Calling GetORders Function & user Details funtion
    this.getOrders();
    this.getUserDetails();
    this.isLoggedIn=localStorage.getItem('username')=='false'?false:true
  }

  ngOnInit(): void {

  }

  // Get UserDetails From payment service 
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
   
  // Get All orders from OrderService 
  getOrders() {
    let email = localStorage.getItem('username');
    if (email != "false") {
      this.orderService.getOrdersByUsername(email).subscribe(
        (data) => {
          this.userOrders = data;          
        },
        (error) => {
          console.log(error);
     })
    } 
  }

  // Converting Date to UtcString and calling in template file
  covertToString(date:any):any{
      var d=new Date(parseInt(date));
      return d.toUTCString();
  }

}
