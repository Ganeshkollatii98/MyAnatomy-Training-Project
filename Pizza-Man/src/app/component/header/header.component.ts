import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import * as AOS from 'aos';
import { MenuService } from '../../services/menuService/menu.service';
import { Recipe } from '../menu/recipe';
import { CartService } from '../../services/cartService/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean=false;
  cartRecipes:Recipe[]=[];
  cartRecipeQty=0
  totalQtyInCart=0;
  constructor(private menuService:MenuService , private cartService:CartService) { 
      this.isLoggedIn =localStorage.getItem('isLoggedIn')=='false'?false:true;
      this.cartService.getCartItems();
      this.cartService.updateCartDetailsByUser();
  }
  ngDoCheck(){
      this.isLoggedIn =localStorage.getItem('isLoggedIn')=='false'?false:true;
      this.getRecipesTotalCount();
  }

  ngOnInit(): void {
    AOS.init();
  }

  // When we click on logout link on heder it will setting localhost 
  handleLogoutInNavBar(){
      localStorage.setItem('isLoggedIn','false');
      localStorage.setItem('username','false');  
  }


  // Checking Total recipes in cart to display quantity on header
  getRecipesTotalCount(){
    if(localStorage.getItem('username')=='false')
    {
       this.totalQtyInCart=0;
    }else{
      // this.cartService.getCartItems();
      this.totalQtyInCart=this.cartService.getCartQuntity();
    }
  }

}
