import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { CartService } from '../../services/cartService/cart.service';
import  dataConstant from '../data.constant'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn!:boolean;
  homeTitle=dataConstant.home.home_title;
  homeDescription=dataConstant.home.home_description;
  constructor(private cartService:CartService,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    AOS.init();
    this.cartService.getCartItems();
  }
  
  // Checking order now button on home page 
  // if we are not loggedin it will navigate to login page
  // if we are logged in it will redirect to MENU page
  handleOrderNowBtn(){
      this.isLoggedIn =localStorage.getItem('isLoggedIn')=='false'?false:true; 
      this.route.navigate([this.isLoggedIn ? 'menu' : 'login'])
  }

}
