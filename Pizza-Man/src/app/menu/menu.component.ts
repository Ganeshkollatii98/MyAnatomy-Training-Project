import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { MenuItemsRestService } from '../menu-items-rest.service';
import { MenuService } from '../menu.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  recipeItems: any[] = [];
  recipeObjArray: Recipe[] = [];
  //variables for filtering veg and non-veg [CheckBox Variable]
  isVegRecipeSelected = false;
  isNonVegRecipeSelected = false;
  //variables for filtering price range [CheckBox Variable]
  isRecipePriceEqualTo_100 = false;
  isRecipePriceBet_100to300 = false;
  isRecipePriceBet_300to600 = false;
  isRecipePriceAbove_600 = false;

  //variables for filtering rating [CheckBox Variable]
  isRecipeStarRating_1 = false;
  isRecipeStarRating_2 = false;
  isRecipeStarRating_3 = false;
  isRecipeStarRating_4 = false;
  isRecipeStarRating_5 = false;
  //Storing Filter Array here
  filterRecipeObject: Recipe[] = [];
  dummyRecipeObj: Recipe[] = [];
  dummyPriceRangeObj: Recipe[] = [];
  dummyRatingObj: Recipe[] = [];
  cartRecipeList: Recipe[] = [];

  constructor(private router: Router, private cartService: CartService, private MenuRestService: MenuItemsRestService, private menuService: MenuService) {
    // Calling MenuSerive Recipe Object and assigning to RecipeObject Array
    this.recipeObjArray = this.menuService.recipeObjArray;
    this.cartService.updateCartDetailsByUser();
    console.log(this.recipeObjArray);
    
    this.doCheck(); 
  }

  ngOnInit(): void {
    // Update Cart When component initlizations
    // this.doCheck();
    this.cartService.updateCartDetailsByUser();
  }
  ngDoCheck() {
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
    // EveryTime We are Checking if Filter is Selected or not
    this.checkingVegAndNonVegFilters();
    this.checkingPriceRangeFilters();
    this.checkingRatingFilters();
    // this.menuService.doCheck();
  }
  // ngOnChanges(){
  //   this.doCheck();
  // }

  // If 
  doCheck() {
    console.log("Ng Do Change called in menu page");
    console.log("Cart Quantity",this.cartService.getCartQuntity());
    console.log("dummy array",this.dummyRecipeObj);
    console.log("recipeObjArrays",this.recipeObjArray);
    this.cartService.updateCartDetailsByUser();
    if(this.dummyPriceRangeObj.length==0){
      if (this.cartService.getCartQuntity()== 0 || localStorage.getItem('username') == 'false') {
        this.recipeObjArray.forEach((recipe) => {
          
          recipe.setRecipeQty = 0;
        })
      }
    }
  }



  // Handling Recipe Increase Button
  decreaseButton(recipeId: number) {
    let user = localStorage.getItem('username');
    if (user != 'false') {
      this.menuService.handleDecreaseButton(recipeId);
      this.cartService.updateCartDetailsByUser();
    }
    else {
      this.router.navigate(['login'])
    }
  }
  // Handling Decrease Button 
  increaseButton(recipeId: number) {
    let user = localStorage.getItem('username');
    if (user != 'false') {
      // Handling IncreseButton Calling From MenuService 
      this.menuService.handleIncreaseButton(recipeId);
      // After Increasing updating cart using cartService
      this.cartService.updateCartDetailsByUser();
    }
    else {
      // If UserDon't Have accont and not yet loggedIn and
      // we are trying to click Increase button it will redirect to Login Page
      this.router.navigate(['login'])
    }
  }

  // Filtering based on Recipe Type(veg,non-veg)
  filterRecipeByType(type: string) {
    // For Veg Type
    if (type == 'veg') {

      this.recipeObjArray.forEach((recipe) => {
        if (recipe.recipeType == type) {
          this.filterRecipeObject.push(recipe)
        }
      }
      )
    }
    // For Non-Veg Type
    else if (type == 'non-veg') {
      this.recipeObjArray.forEach((recipe) => {
        if (recipe.recipeType == type) {
          this.filterRecipeObject.push(recipe)
        }
      })
    }

  }
  checkingVegAndNonVegFilters() {
    // Checking Variables 
    this.dummyRecipeObj = [];
    if (this.filterRecipeObject.length > 0
      && ((this.isNonVegRecipeSelected == false && this.isVegRecipeSelected == true)
        || (this.isNonVegRecipeSelected == true && this.isVegRecipeSelected == false)
        || (this.isNonVegRecipeSelected == true || this.isVegRecipeSelected == true)
      )) {
      // Assigning to dummy Object
      this.dummyRecipeObj = this.filterRecipeObject;
    }
    else if (this.isNonVegRecipeSelected == false && this.isVegRecipeSelected == false) {
      this.filterRecipeObject = [];
      // And Assigning to Dummy Object
      this.dummyRecipeObj = this.recipeObjArray;
    }
  }

  // Filtering based price range 
  filterRecipeByPrice(recipePriceRange: string) {
    // Based Price Range Under 100Rs
    if (recipePriceRange == '1') {
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice <= 100) {
            return true;
          }
          return false;
        })
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {
          if (recipe.recipePrice <= 100) {
            return true;
          }
          return false;
        })
      }
    }
    // Based Price Range Between 100 - 300
    else if (recipePriceRange == '2') {
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice > 100 && recipe.recipePrice <= 300) {
            return true;
          }
          return false;
        }
        )
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {
          if (recipe.recipePrice > 100 && recipe.recipePrice <= 300) {
            return true;
          }
          return false;
        })
      }
    }
    // Based Price Range Between 300 - 600
    else if (recipePriceRange == '3') {
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice > 300 && recipe.recipePrice <= 600) {
            return true;
          }
          return false;
        }
        )
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {
          if (recipe.recipePrice > 300 && recipe.recipePrice <= 600) {
            return true;
          }
          return false;
        })
      }
    }
    // Based Price Range Above 600
    else if (recipePriceRange == '4') {
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice > 600) {
            return true;
          }
          return false;
        }
        )
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {
          if (recipe.recipePrice > 600) {
            return true;
          }
          return false;
        })
      }
    }
    // AtLast Assigning to PriceObject
    this.dummyPriceRangeObj = this.filterRecipeObject;
  }

  // Filter With Price Range
  filterRecipeByRating(recipeRating: number) {
    // Based on 1 Star rating
    if (recipeRating == 1) {  
      this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => recipe.recipeRating == recipeRating)
    }
    // Based on 2 Star rating
    else if (recipeRating == 2) {
      this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => recipe.recipeRating == recipeRating)
    }
    // Based on 3 Star rating
    else if (recipeRating == 3) {
      this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => recipe.recipeRating == recipeRating)
    }
    // Based on 4 Star rating
    else if (recipeRating == 4) {
      this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => recipe.recipeRating == recipeRating)
    }
    // Based on 5 Star rating
    else if (recipeRating == 5) {
      this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => recipe.recipeRating == recipeRating)
    }

    // And Assigning to dummy Object
    this.dummyRatingObj = this.filterRecipeObject;
  }

  // Checking Price Filter if Any Range selected it will give particular range Prodcuts
  //  If not it will give all products with All Ranges
  checkingPriceRangeFilters() {
    if (this.dummyRecipeObj.length > 0 &&
      ((this.isRecipePriceEqualTo_100)
        || (this.isRecipePriceBet_100to300)
        || (this.isRecipePriceBet_300to600)
        || (this.isRecipePriceAbove_600))) {
      // Assigning to Global Dummy  Object
      this.dummyRecipeObj = this.dummyPriceRangeObj;
    }
    else{
      this.dummyRecipeObj=this.recipeObjArray;
    }
  }

  // Checking Rating Filter if Any Rating selected it will give particular Rating Prodcuts
  //  If not it will give all products with All Ratings
  checkingRatingFilters() {
    if (this.dummyRatingObj.length > 0 &&
      ((this.isRecipeStarRating_1)
        || (this.isRecipeStarRating_2)
        || (this.isRecipeStarRating_3)
        || (this.isRecipeStarRating_4)
        || (this.isRecipeStarRating_5))) {
          // Assigning to Global Dummy  Object
      this.dummyRecipeObj = this.dummyRatingObj;
      
    }
    else{
      this.dummyRecipeObj=this.recipeObjArray;
    }
  }

}
