import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './menu/recipe';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsRestService {
  // Class Variables
  // JSON URL
  URL='http://localhost:8080/api/products';
  constructor(private http:HttpClient) {

   }

  //Fetching data from menu json data using 'Get'
  getMenuList(){
      return this.http.get(this.URL);
  }


}
