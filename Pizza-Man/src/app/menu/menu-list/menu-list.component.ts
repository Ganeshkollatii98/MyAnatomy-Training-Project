import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { MenuItemsRestService } from 'src/app/menu-items-rest.service';
import { MenuComponent } from '../menu.component';

import * as AOS from 'aos';
import { Recipe } from '../recipe';
import { MenuService } from 'src/app/menu.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  
  constructor(private cartService:CartService,private router:Router,private menuComponent:MenuComponent,private menuService:MenuService) {
    if(localStorage.getItem('username')!='false')
    {
     this.menuService.checkIfUserAlreadyHaveProductsInCart();
    }
    this.menuService.getCartItemsFromServer();

  }
  ngOnInit(): void {
    AOS.init();
  }
  ngDoCheck(){
    
     this.menuService.doCheck();
     this.recipeList=this.menuService.recipeObjArray;
  }
  ngDoChanges(){
    this.menuService.getCartItemsFromServer();
}
  recipeList:Recipe[]=[]
  
  increaseButton(recipeId:number){
    let user=localStorage.getItem('username');
    if(user!='false')
    {
      this.menuService.handleIncreaseButton(recipeId);
      this.cartService.getCartItems();
      
    }
    else{
      this.router.navigate(['login'])
    }
   
//    this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
//     this.router.navigate(['menu']);
// }); 
  
  }
  decreaseButton(recipeId:number){
    
    let user=localStorage.getItem('username');
    if(user!='false')
    {
      this.menuService.handleDecreaseButton(recipeId);
      this.cartService.getCartItems();
    }
    else{
      this.router.navigate(['login'])
    }
  }
  
  

}


