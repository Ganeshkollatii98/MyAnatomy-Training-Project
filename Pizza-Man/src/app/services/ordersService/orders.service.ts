import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from '../cartService/cart.service';
import { Recipe } from '../../component/menu/recipe';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
//  Declaring cart recipes Variable
  cartRecipeList: Recipe[] = [];
  // Orders Url
  URL="http://localhost:8080/api/orders";
  constructor(private http:HttpClient,private cartService:CartService) { 
     this.cartService.updateCartDetailsByUser()
     this.cartRecipeList = this.cartService.cartReipesAfterModefyingForUser;
  }

  // Inserting Recipes after placing order
  postProductsToOrdersTable(email:any,address:string,cartRecipes:any,status:number){
       let body={username:email,address:address,recipes:cartRecipes,status:status};
       let header = { 'content-type': 'application/json' };
       return this.http.post(this.URL,body,{'headers':header,responseType:'text'});
  }
  // Get Orders By Username
  getOrdersByUsername(email:any){
      return this.http.get(this.URL+"/"+email);
  }
}
