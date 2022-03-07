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

  // new
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
  getCartItems(){
    this.cartRestService.getAllCartItems().subscribe((data:any)=>{
      this.cartRecipesFromDb=data;
    },(error)=>{
      console.log(error);   
    })
  }
  
  // updateCartItems(){
  //   console.log("updating mini****************");
  //   this.cartReipesAfterModefying=[];
  //   console.log(this.menuService.userRecipesInCart);
  //   this.menuService.userRecipesInCart.forEach((crecipe)=>{
          
  //         let mainRecipe=this.recipeList.filter((mrecipe)=>{
  //           if(crecipe.recipeId==mrecipe.recipeId)
  //           {
  //             mrecipe.setRecipeQty=crecipe.recipeQty;
  //             return true;
  //           }
  //           else{
  //              mrecipe.setRecipeQty=0;
  //              return false;
  //           }
  //           return false;
  //         })
  //         console.log("Main Recipe???????????///??");
  //         this.cartReipesAfterModefying.push(mainRecipe[0]); 
  //   })
  //   console.log("**********************************");
  //   console.log("i watn this ``````````");
  //   console.log(this.cartReipesAfterModefying);
    
  // }


  // New
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
      console.log("After Long Time",this.cartReipesAfterModefyingForUser);
      
      },
       (error)=>{
          console.log(error);
       }
      )
  }

  getCartTotalPrice():number{
     let totalPrice=0;
       this.cartRecipesByUser.forEach((recipe)=>{
           totalPrice+=recipe.recipePrice*recipe.recipeQty;
       })
       return totalPrice;
  }
  getCartQuntity():number{
      let totalQty=0;
      this.cartRecipesByUser.forEach((recipe)=>{
        totalQty+=recipe.recipeQty;
    })
    return totalQty;
  }

}
