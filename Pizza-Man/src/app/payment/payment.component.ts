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
  editAddress=""
  editPhoneNumber="";
  editPincode=""
  isAddressAdded=false;
  address=""
  phonenumber=""
  pincode!:any;
  details!:UserDetails[];
  cartRecipeList!:Recipe[];
  isCodSelected=false;
  constructor(private menuService:MenuService,private router:Router,private cartRestService:CartRestService,private paymentService:PaymentRestService,private cartService:CartService,private orderService:OrdersService) {
      this.check();
      this.cartService.updateCartDetailsByUser()
     
   }

  ngOnInit(): void {
  }

  paymentModeSelected(mode:string){
    this.isCodSelected=true;
  }
  ngDoCheck(){
     this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
  }

  handlePlaceOrderButton(){
      let recipes=this.cartRecipeList;
      let email=localStorage.getItem('username');
    
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
      
      // this.router.navigate(['customer/orders'])

      
  }

  check(){
      let email=localStorage.getItem('username')

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
            console.log(this.address,this.phonenumber,this.pincode,this.details);
            
            this.isAddressAdded=true;
          }
          
      },(error)=>{
         console.log("comming here check it");
         
         console.log(error);
      }
      )
  }
  AddAddressButton(address:any,phoneNumber:any,pincode:any){
      let email=localStorage.getItem('username')
      this.paymentService.addAddress(email,address,phoneNumber,pincode).subscribe((data:any)=>{
          console.log(data);
          
          this.isAddressAdded=true;
      },(error)=>{
         console.log(error);
      })
  }
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
