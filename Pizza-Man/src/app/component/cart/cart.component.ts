import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartRestService } from '../../services/cartService/cart-rest.service';
import { CartService } from '../../services/cartService/cart.service';
import { MenuService } from '../../services/menuService/menu.service';
import { Recipe } from '../menu/recipe';
import { CartModel } from './cartModel';
import * as AOS from 'aos';
import dataConstent from '../data.constant';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //Varibles used in cart
  cartRecipeList: Recipe[] = [];
  miniCartRecipesTotalPrice = 0;
  isCartEmpty = true;
  cartTotalPrice=0;
  price=0

  cartRecipes:Recipe[]=[];
  // Checking if user is loggedin or not
  checkLoggedIn=localStorage.getItem('isLoggedIn')=='false'?false:true; 
  recipeListObj:Recipe[]=[];
  cartEmptyDesc1=dataConstent.cartEmpty.desc1;
  cartEmptyDesc2=dataConstent.cartEmpty.desc2;
  constructor(private router:Router,private menuService:MenuService,private cartService:CartService,private cartRestService:CartRestService) { 
    this.checkIsCartEmpty();
     this.menuService.getCartItemsFromServer();
     this.recipeListObj=this.menuService.recipeObjArray;
     this.cartService.updateCartDetailsByUser()
  }
  ngOnInit(): void {
    // creating instance for Animation on scroll library
    AOS.init();

  }
  ngDoCheck(){ 
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
    this.checkIsCartEmpty();
    this.updateMiniCartTotalPrice();
  }

  // Checking if cart is empty or not
  checkIsCartEmpty() {
    if (this.cartRecipeList.length > 0) {
      // console.log("cart not empty");
      this.isCartEmpty = false;
      console.log(this.isCartEmpty);
    }
    else {
      this.isCartEmpty = true;
    }
  }

  // Increase button in cart products
  handleIncreaseButton(recipeId:number){
    this.menuService.handleIncreaseButton(recipeId);
    this.cartService.updateCartDetailsByUser();
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
    this.updateMiniCartTotalPrice();
  }
  // Decrease button in cart products
  handleDecreaseButton(recipeId:number){
    this.menuService.handleDecreaseButton(recipeId);
    this.cartService.updateCartDetailsByUser();
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
    this.updateMiniCartTotalPrice();
    
  }

  // Updating cart price here
  updateMiniCartTotalPrice(){
    this.miniCartRecipesTotalPrice = this.cartService.cartTotalPrice;
  }

  // Handling checkout button here and redirecting to payment page
  handleCheckoutBtn(){
    console.log("clciked");
    this.router.navigate(['/payment'])
  }
  
}
