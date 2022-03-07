import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn!:boolean;
  constructor(private cartService:CartService,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    AOS.init();
    this.cartService.getCartItems();
  }
  ngDoCheck(){
    //  checking if user logged in or not
    this.isLoggedIn =localStorage.getItem('isLoggedIn')=='false'?false:true; 
  }

  // Checking order now button on home page 
  // if we are not loggedin it will navigate to login page
  // if we are logged in it will redirect to MENU page
  handleOrderNowBtn(){
      if(this.isLoggedIn)
      {
        this.route.navigate(['menu'])

      }
      else if(this.isLoggedIn==false){
        this.route.navigate(['login'])

      }
  }

}
