import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartRestService {
  // URL For Cart 
  URL="http://localhost:8080/api/carts";
  constructor(private http:HttpClient) {
      // Injecting http client
   }
   
  //Get all cart items 
  getAllCartItems(){
    return this.http.get(this.URL);
  }

  //Get Cart items only with logged in mail
  getCartDetailsByUser(email:any){
    return this.http.get(this.URL+"/"+email);
  }

  // Updating Qunatity in cart(in server and db asWell) when products we clicked on + increase button
  updateQtyInCartDb(name:any,id:number,qty:number){
    let body={username:name,recipeId:id,recipeQty:qty};
    return this.http.put(this.URL,body,{responseType:'text'});
  }

  // Adding Recipe to server-database  when we clicked on + icon on menu page 
  addRecipeToCart(name:any,rid:number,rqty:number,rprice:number){ 
    let body={username:name,recipeId:rid,recipeQty:rqty,recipePrice:rprice};
    let header = { 'content-type': 'application/json' };
    return this.http.post(this.URL,body,{'headers':header,responseType:'text'});
  }

  // delete recipe when product is less then 1 in cart page and db
  deleteRecipeFromCart(username:any,recipeId:number){
    let bodyPassed={username:username,recipeId:recipeId};
    let header = { 'content-type': 'application/json' };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify(bodyPassed),
    };
    return this.http.delete(this.URL,options);
  }

  // Delete All Recipes For Particular user
  deleteRecipesForUsername(email:any){
    let username=email;
    return this.http.delete(this.URL+"/"+username);
  }
}
