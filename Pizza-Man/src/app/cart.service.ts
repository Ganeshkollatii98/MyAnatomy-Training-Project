import { Injectable } from '@angular/core';
import { CartRestService } from './cart-rest.service';
import { CartModel } from './cart/cartModel';
import { MenuItemsRestService } from './menu-items-rest.service';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu/menu.component';
import { Recipe } from './menu/recipe';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartRecipesFromDb:CartModel[]=[];
  cartReipesAfterModefying:Recipe[]=[]
  recipeList:Recipe[]=[];

  // newVariables in cart page
  cartRecipesByUser:CartModel[]=[];
  cartReipesAfterModefyingForUser:Recipe[]=[];
  cartTotalPrice=0;
  cartTotalQuantity=0;
  recipeObjArray:Recipe[]=[];
  // private menuService:MenuService,
  constructor(private menuRestService:MenuItemsRestService,private menuService:MenuService,private cartRestService:CartRestService) { 
    this.getCartItems();
    this.updateCartDetailsByUser();
    this.recipeList=this.menuService.recipeObjArray;
  }

  // Get All cart items 
  getCartItems(){
    this.cartRestService.getAllCartItems().subscribe((data:any)=>{
      this.cartRecipesFromDb=data;
    },(error)=>{
      console.log(error);   
    })
  }
  
  // Update Cart details with username
  updateCartDetailsByUser(){
    this.cartReipesAfterModefyingForUser=[]
     let user=localStorage.getItem('username')
      this.cartRestService.getCartDetailsByUser(user).subscribe((data:any)=>{
        this.cartRecipesByUser=data
        this.menuService.doCheck();
        // update recipeObj
      if(localStorage.getItem('username')!=='false')
      {
        this.cartReipesAfterModefyingForUser=[]
          this.menuService.recipeObjArray.forEach((recipe)=>{
                for(let obj of this.cartRecipesByUser)
                {
                   if(obj.recipeId==recipe.recipeId)
                   {
                      recipe.setRecipeQty=obj.recipeQty;
                      this.cartReipesAfterModefyingForUser.push(recipe)
                   }
                }
          })
          this.cartTotalPrice=this.getCartTotalPrice();
          this.cartTotalQuantity=this.getCartQuntity();
      }
      },
       (error)=>{
        //  errors handling
          console.log(error);
       }
      )
  }

  // Fetching  all cart items total price
  getCartTotalPrice():number{
     let totalPrice=0;
       this.cartRecipesByUser.forEach((recipe)=>{
           totalPrice+=recipe.recipePrice*recipe.recipeQty;
       })
       return totalPrice;
  }
 
  // Fetching all Cart items quentity
  getCartQuntity():number{
      let totalQty=0;
      this.cartRecipesByUser.forEach((recipe)=>{
        totalQty+=recipe.recipeQty;
    })
    return totalQty;
  }

}
