import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Recipe } from './menu/recipe';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  cartRecipeList: Recipe[] = [];
  URL="http://localhost:8080/api/orders";
  constructor(private http:HttpClient,private cartService:CartService) { 
     this.cartService.updateCartDetailsByUser()
     this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
     
  }

  postProductsToOrdersTable(email:any,address:string,cartRecipes:any,status:number){
    // emial:any,cartRecipes:any,status:number
       console.log("order service");
       console.log(email,address,cartRecipes,status);
       let body={username:email,address:address,recipes:cartRecipes,status:status};
       let header = { 'content-type': 'application/json' };
       return this.http.post(this.URL,body,{'headers':header,responseType:'text'});

  }
  getOrdersByUsername(email:any){
      return this.http.get(this.URL+"/"+email);
  }
}
