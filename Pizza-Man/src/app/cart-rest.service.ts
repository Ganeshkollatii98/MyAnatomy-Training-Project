import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartRestService {
  URL="http://localhost:8080/api/carts";
  constructor(private http:HttpClient) {

   }
   
  //get all cart items
  getAllCartItems(){
    return this.http.get(this.URL);
  }
  getCartDetailsByUser(email:any){
    return this.http.get(this.URL+"/"+email);
  }
  updateQtyInCartDb(name:any,id:number,qty:number){
    let body={username:name,recipeId:id,recipeQty:qty};
    console.log("baby",body);
    
    console.log("hitted update please check daa");
    
    return this.http.put(this.URL,body,{responseType:'text'});
  }
  addRecipeToCart(name:any,rid:number,rqty:number,rprice:number){
    // let endPoint="/auth/register";
    
    // console.log(email,password);
    let body={username:name,recipeId:rid,recipeQty:rqty,recipePrice:rprice};
    console.log("username:"+name,rid,rqty,rprice);
    console.log("hitted");
    
    let header = { 'content-type': 'application/json' };
    return this.http.post(this.URL,body,{'headers':header,responseType:'text'});
   
  }
  deleteRecipeFromCart(username:any,recipeId:number){
    let bodyPassed={username:username,recipeId:recipeId};
    let header = { 'content-type': 'application/json' };

    console.log("hitted deleted check daa",bodyPassed);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify(bodyPassed),
    };
    return this.http.delete(this.URL,options);
    // return this.http.delete(this.URL,body);
  }
  deleteRecipesForUsername(email:any){
    let username=email;
    return this.http.delete(this.URL+"/"+username);

  }
}
