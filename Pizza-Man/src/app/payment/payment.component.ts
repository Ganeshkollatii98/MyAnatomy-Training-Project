import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartRestService } from '../cart-rest.service';
import { CartService } from '../cart.service';
import { MenuService } from '../menu.service';
import { Recipe } from '../menu/recipe';
import { OrdersService } from '../orders.service';
import { OrdersComponent } from '../orders/orders.component';
import { PaymentRestService } from '../payment-rest.service';
import {UserDetails} from './userDetails';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  // variable declarations 
  editAddress=""
  editPhoneNumber="";
  editPincode=""
  isAddressAdded=false;
  address=""
  phonenumber=""
  pincode!:any;

  // Storing all user details here:
  details!:UserDetails[];
  cartRecipeList!:Recipe[];

  // IsCodSelected
  isCodSelected=false;
  constructor(private menuService:MenuService,private router:Router,private cartRestService:CartRestService,private paymentService:PaymentRestService,private cartService:CartService,private orderService:OrdersService) {
      this.check();
      this.cartService.updateCartDetailsByUser()
     
   }
  // checking payment mode selected or not
  paymentModeSelected(mode:string){
    this.isCodSelected=true;
  }
  ngDoCheck(){
     this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
  }
  ngOnInit(): void {
      
  }

  // HandlePLaceOrder Button and pushing all cart list to database
  handlePlaceOrderButton(){
      let recipes=this.cartRecipeList;
      let email=localStorage.getItem('username');
      // Status=0 for all orders at starting stage 
      let status=0;
      this.address=this.address==null ?this.details[0].address:this.address;
      if(email!='false')
      {
          this.orderService.postProductsToOrdersTable(email,this.address,recipes,status).subscribe(
            (data:any)=>{
               console.log("posted data",data);
            },
            (error)=>{
              console.log("error",error);
            }
          )
      }
      this.cartRestService.deleteRecipesForUsername(email).subscribe(
        (data)=>{
            this.cartRestService.getAllCartItems();
           
        },
        (error)=>{
           console.log(error);
           
        }
      )
      this.cartService.updateCartDetailsByUser();   
  }

  check(){
      let email=localStorage.getItem('username')
      // with the help of payment service fetching orders
      this.paymentService.getDetailsByEmail(email).subscribe(
        (data:any)=>{
          if(data.length>0){
            this.address=data[0].address;
            this.editAddress=data[0].address;
            this.phonenumber=data[0].phonenumber;
            this.editPincode=data[0].pincode;
            this.editPhoneNumber=data[0].phonenumber;
            this.pincode=data[0].pincode;
            console.log("hello",data);
            this.details=data;
            // console.log(this.address,this.phonenumber,this.pincode,this.details);
            this.isAddressAdded=true;
          }
          
      },(error)=>{
        // Handling error here
         console.log(error);
      }
      )
  }

  // If address not updated add address button will be enabled and we can add userData
  AddAddressButton(address:any,phoneNumber:any,pincode:any){
      let email=localStorage.getItem('username')
      this.paymentService.addAddress(email,address,phoneNumber,pincode).subscribe((data:any)=>{
          console.log(data);
          
          this.isAddressAdded=true;
      },(error)=>{
         console.log(error);
      })
  }
  // If address already added going to update address
  // Handling update address button
  updateAddressButton(address:any,phoneNumber:any,pincode:any){
     console.log("iam upadating");
     console.log(address,phoneNumber,pincode);
      let email=localStorage.getItem('username')
      this.paymentService.updateUserDetails(email,address,phoneNumber,pincode).subscribe((data:any)=>{
        console.log("updated details");
        this.check();
    },(error)=>{
       console.log(error);
    })

  }

}
