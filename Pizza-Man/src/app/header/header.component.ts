import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import * as AOS from 'aos';
import { MenuService } from '../menu.service';
import { Recipe } from '../menu/recipe';
import { CartService } from '../cart.service';
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
      localStorage.setItem('isLoggedIn','false');
      localStorage.setItem('username','false');
      this.isLoggedIn =localStorage.getItem('isLoggedIn')=='false'?false:true;
      // this.cartRecipeQty=this.getRecipesTotalCount(); 
      this.cartService.updateCartDetailsByUser();
  }
  ngDoCheck(){
      this.isLoggedIn =localStorage.getItem('isLoggedIn')=='false'?false:true;
      this.cartRecipes=this.menuService.getRecipesFromMenu().filter((recipe)=>recipe.getRecipeQty>0);
      this.totalQtyInCart=this.getRecipesTotalCount();
  }

  ngOnInit(): void {
    AOS.init();
  }

  // When we click on logout link on heder it will setting localhost 
  handleLogoutInNavBar(){
      localStorage.setItem('isLoggedIn','false');
      localStorage.setItem('username','false');
      this.isLoggedIn=localStorage.getItem('isLoggedIn')=='false'?false:true 
  }


  // Checking Total recipes in cart to display quantity on header
  getRecipesTotalCount(){
    if(localStorage.getItem('username')=='false')
    {
       return 0;
    }else{
      // this.cartService.getCartItems();
      return this.cartService.getCartQuntity();
    }
  }

}
