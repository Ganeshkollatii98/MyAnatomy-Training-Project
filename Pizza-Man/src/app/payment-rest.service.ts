import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentRestService {
  URL="http://localhost:8080/api/userDetails";
  constructor(private http:HttpClient) { }

  addAddress(e:any,a:string,pn:any,p:any){
    let body={username:e,address:a,phonenumber:pn,pincode:p};
    let header = { 'content-type': 'application/json' };
    return this.http.post(this.URL,body,{'headers':header,responseType:'text'});
  }
  updateUserDetails(e:any,a:string,pn:any,p:any){
    let body={username:e,address:a,phonenumber:pn,pincode:parseInt(p)};
    console.log("baby",body);
    
    console.log("hitted update please check daa");
    
    return this.http.put(this.URL,body,{responseType:'text'});
  }

  getDetailsByEmail(email:any){
     return this.http.get(this.URL+"/"+email);
  }

}
