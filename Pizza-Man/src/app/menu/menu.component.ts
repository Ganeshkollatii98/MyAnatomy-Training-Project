import { Component, OnInit } from '@angular/core';
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
  //variables for filtering veg and non-veg
  isVegRecipeSelected = false;
  isNonVegRecipeSelected = false;
  //variables for filtering price range
  isRecipePriceEqualTo_100 = false;
  isRecipePriceBet_100to300 = false;
  isRecipePriceBet_300to600 = false;
  isRecipePriceAbove_600 = false;
  
  //variables for filtering rating
  isRecipeStarRating_1 = false;
  isRecipeStarRating_2 = false;
  isRecipeStarRating_3 = false;
  isRecipeStarRating_4 = false;
  isRecipeStarRating_5 = false;
  //Storing Filter Array here
  filterRecipeObject: Recipe[] = [];
  dummyRecipeObj:Recipe[]=[];
  dummyPriceRangeObj:Recipe[]=[];
  dummyRatingObj:Recipe[]=[];
  cartRecipeList:Recipe[]=[];
  constructor(private router:Router,private cartService:CartService,private MenuRestService: MenuItemsRestService,private menuService:MenuService) {
    this.recipeObjArray=this.menuService.recipeObjArray;
    this.cartService.updateCartDetailsByUser();
  }
  
  ngOnInit(): void {
    this.cartService.updateCartDetailsByUser();
  }
  ngDoCheck(){
    this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<",this.cartRecipeList);
    
    this.checkingVegAndNonVegFilters();
    this.checkingPriceRangeFilters();
    this.checkingRatingFilters();
    this.menuService.doCheck();
    // console.log("after checking price range",this.dummyRecipeObj);
  }

  

  // Handling Recipe Increase Button
  decreaseButton(recipeId:number){
    
    let user=localStorage.getItem('username');
    if(user!='false')
    {
      this.menuService.handleDecreaseButton(recipeId);
      this.cartService.updateCartDetailsByUser();
    //  console.log("clciked inc",this.cartService.getCartQuntity());
      
    }
    else{
      this.router.navigate(['login'])
    }
  }
  increaseButton(recipeId:number){
    let user=localStorage.getItem('username');
    if(user!='false')
    {
      this.menuService.handleIncreaseButton(recipeId);
      this.cartService.updateCartDetailsByUser();
      console.log("clciked inc",this.cartService.getCartQuntity());

    }
    else{
      this.router.navigate(['login'])
    }
  }

  // Filtering based on type
  filterRecipeByType(type: string) {
    console.log(this.isNonVegRecipeSelected, this.isVegRecipeSelected);
    if (type == 'veg') {

      this.recipeObjArray.forEach((recipe) => {
        if (recipe.recipeType == type) {
          this.filterRecipeObject.push(recipe)
        }
      }
      )

    }
    else if (type == 'non-veg') {
      this.recipeObjArray.forEach((recipe) => {
        if (recipe.recipeType == type) {
          this.filterRecipeObject.push(recipe)
        }
      })
    }  
   
  }
  checkingVegAndNonVegFilters(){
    console.log(this.isNonVegRecipeSelected,this.isVegRecipeSelected);
    this.dummyRecipeObj=[];
    if(this.filterRecipeObject.length>0 
      &&( (this.isNonVegRecipeSelected==false && this.isVegRecipeSelected==true )
      ||  (this.isNonVegRecipeSelected==true && this.isVegRecipeSelected==false )
      || (this.isNonVegRecipeSelected==true || this.isVegRecipeSelected==true )
    )){
      this.dummyRecipeObj=this.filterRecipeObject;
      //  console.log("after Dummy Object " ,this.dummyRecipeObj);
    }
    else if(this.isNonVegRecipeSelected==false && this.isVegRecipeSelected==false ){
      this.filterRecipeObject= [];
      this.dummyRecipeObj=this.recipeObjArray;
      // console.log("dummy",this.dummyRecipeObj);
    }
  }
  filterRecipeByPrice(recipePriceRange: string) {
    if (recipePriceRange == '1') {
      console.log("below 100");
      
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
          console.log(recipe.recipePrice);
          if (recipe.recipePrice <= 100) {
            return true;
          }
          return false;
        })
      }
    }
    else if(recipePriceRange=='2'){
      console.log("above 200");
      
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice >100 && recipe.recipePrice <=300) {
            return true;
          }
          return false;
        }
        )
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {
          if (recipe.recipePrice >100 && recipe.recipePrice <=300) {
            return true;
          }
          return false;
        })
      }
    }
    else if(recipePriceRange=='3'){
      console.log("above 300");
      
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice >300 && recipe.recipePrice <=600) {
            return true;
          }
          return false;
        }
        )
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {

          if (recipe.recipePrice >300 && recipe.recipePrice <=600) {
            return true;
          }
          return false;
        })
      }
    }
    else if(recipePriceRange=='4'){
      console.log("above 400");
      
      if (this.filterRecipeObject.length > 0) {
        this.filterRecipeObject = this.filterRecipeObject.filter((recipe) => {
          if (recipe.recipePrice >600) {
            return true;
          }
          return false;
        }
        )
      }
      else {
        this.filterRecipeObject = this.dummyRecipeObj.filter((recipe) => {
          console.log(recipe.recipePrice);
          console.log(recipe.recipePrice);
          if (recipe.recipePrice >600) {
            return true;
          }
          return false;
        })
      }
    }
    // console.log("filter array",this.filterRecipeObject);
  //  console.log("Updated by dummy price",this.dummyRecipeObj);
   this.dummyPriceRangeObj=this.filterRecipeObject;
  //  console.log("dummy object",this.dummyRecipeObj);
   
  }

  filterRecipeByRating(recipeRating:number){
    // console.log("clicke",recipeRating);
    // console.log("Dummy Recipe Object ",this.dummyRecipeObj);
    
    if(recipeRating==1){
      console.log("Filter with 1 star");
      this.filterRecipeObject=this.dummyRecipeObj.filter((recipe)=>recipe.recipeRating==recipeRating)
      console.log("This is filter object after filter with 1 start",this.filterRecipeObject);
      
    }
    else if(recipeRating==2){
      console.log("Filter with 2 star");
      this.filterRecipeObject=this.dummyRecipeObj.filter((recipe)=>recipe.recipeRating==recipeRating)
      console.log("This is filter object after filter with 2 start",this.filterRecipeObject);  
    }
    else if(recipeRating==3)
    {
      console.log("Filter with 3 star");
      this.filterRecipeObject=this.dummyRecipeObj.filter((recipe)=>recipe.recipeRating==recipeRating)
      console.log("This is filter object after filter with 3 start",this.filterRecipeObject);
    }
   else if(recipeRating==4){
      console.log("Filter with 4 star");
      this.filterRecipeObject=this.dummyRecipeObj.filter((recipe)=>recipe.recipeRating==recipeRating)
      console.log("This is filter object after filter with 4 start",this.filterRecipeObject);
      
    }
   else if(recipeRating==5){
    console.log("Filter with 5 star");
    this.filterRecipeObject=this.dummyRecipeObj.filter((recipe)=>recipe.recipeRating==recipeRating)
    console.log("This is filter object after filter with 5 start",this.filterRecipeObject);   
   }
   console.log("****************************************");
  //  console.log("filter array after rating",this.filterRecipeObject);
  //  console.log("dummy rating object",this.dummyRatingObj);
   this.dummyRatingObj=this.filterRecipeObject;
  //  console.log("dummyRatingObject",this.dummyRatingObj);
  //  console.log("dummy object",this.dummyRecipeObj);
  }
  checkingPriceRangeFilters(){
        // console.log(
        //   this.isRecipePriceEqualTo_100,
        //   this.isRecipePriceBet_100to300,
        //   this.isRecipePriceBet_300to600,
        //   this.isRecipePriceAbove_600
        // );
       if(this.dummyRecipeObj.length>0 && 
        ((this.isRecipePriceEqualTo_100) 
        || (this.isRecipePriceBet_100to300)
        || (this.isRecipePriceBet_300to600) 
        || (this.isRecipePriceAbove_600)))
       {
        //  console.log("Going to update data after price range filter");
         
          this.dummyRecipeObj=this.dummyPriceRangeObj;
          // console.log(this.dummyRecipeObj);
       }
  }
  checkingRatingFilters(){
    // console.log(
    //   this.isRecipePriceEqualTo_100,
    //   this.isRecipePriceBet_100to300,
    //   this.isRecipePriceBet_300to600,
    //   this.isRecipePriceAbove_600
    // );
   if(this.dummyRatingObj.length>0 && 
    ((this.isRecipeStarRating_1) 
    || (this.isRecipeStarRating_2)
    || (this.isRecipeStarRating_3) 
    || (this.isRecipeStarRating_4) 
    || (this.isRecipeStarRating_5)))
   {
    //  console.log("Going to update data after star rating filter");
      this.dummyRecipeObj=this.dummyRatingObj;
      // console.log("printing after filter");
      // console.log(this.dummyRecipeObj);
   }
 }

}
