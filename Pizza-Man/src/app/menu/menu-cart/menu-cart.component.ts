import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { MenuComponent } from '../menu.component';
import { Recipe } from '../recipe';
import * as AOS from 'aos';
import { MenuService } from 'src/app/menu.service';
import { CartService } from 'src/app/cart.service';
import { CartRestService } from 'src/app/cart-rest.service';
@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.css']
})
export class MenuCartComponent implements OnInit {
  //Initilizing variables
  cartRecipeList: Recipe[] = [];
  miniCartRecipesTotalPrice = 0;
  isCartEmpty = true;

  constructor(private cartRestService:CartRestService,private cartService: CartService, private menuService: MenuService, private http: HttpClient, private router: Router, private menuList: MenuListComponent, private menu: MenuComponent) {
     this.cartService.updateCartDetailsByUser()
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;

  }


  // Passing from parent 
  @Input() recipeListObj: Recipe[] = [];
  ngOnInit(): void {
    this.cartService.updateCartDetailsByUser()
    AOS.init();
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;

  }
  ngDoCheck() {
    // this.menuService.getCartItemsFromServer();
     
    this.checkIsCartEmpty();
    this.updateMiniCartTotalPrice();

  }
  ngDoChanges(){
      
  }
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

  goToCartPageViaBtn() {
    this.router.navigate(['cart']);
  }
  updateMiniCartTotalPrice() {
    this.miniCartRecipesTotalPrice = this.cartService.cartTotalPrice;
  }

  handleIncreaseButton(recipeId: number) {
    this.menuService.handleIncreaseButton(recipeId)
    this.ngOnInit();
    // this.menu.handleIncreaseButton(recipeId);
    // this.cartService.updateCartDetailsByUser()
    // this.recipeListObj = this.cartService.cartReipesAfterModefyingForUser;

    // this.updateMiniCartList();
  }
  handleDecreaseButton(recipeId: number) {
    this.menuService.handleDecreaseButton(recipeId);
    this.ngOnInit();
    // this.menu.handleDecreaseButton(recipeId);
    // this.cartService.updateCartDetailsByUser()
    // this.recipeListObj = this.cartService.cartReipesAfterModefyingForUser;

    // this.updateMiniCartList();
  }
  handleClearCartButton() {
    let email=localStorage.getItem('username')
    this.cartRestService.deleteRecipesForUsername(email).subscribe(
      (data)=>{
          this.cartRestService.getAllCartItems();
         
      },
      (error)=>{
         console.log(error);
         
      }
    )

  }

}
