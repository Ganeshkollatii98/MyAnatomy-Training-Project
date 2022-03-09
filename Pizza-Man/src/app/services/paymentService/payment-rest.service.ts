import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentRestService {
  // URL for userDetails
  URL="http://localhost:8080/api/userDetails";

  constructor(private http:HttpClient) { }

  // Inserting Address if user dont have address
  addAddress(e:any,a:string,pn:any,p:any){
    let body={username:e,address:a,phonenumber:pn,pincode:p};
    let header = { 'content-type': 'application/json' };
    return this.http.post(this.URL,body,{'headers':header,responseType:'text'});
  }

  // Update user Address when user already have Address 
  updateUserDetails(e:any,a:string,pn:any,p:any){
    let body={username:e,address:a,phonenumber:pn,pincode:parseInt(p)};
    return this.http.put(this.URL,body,{responseType:'text'});
  }

  // Get userDetails with particular Gmail
  getDetailsByEmail(email:any){
     return this.http.get(this.URL+"/"+email);
  }

}
