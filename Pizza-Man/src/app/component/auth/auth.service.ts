import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // This URL is main url of my server
  URL="http://localhost:8080/api"
  constructor(private http:HttpClient) { 

  }

  // Registering new user posting into server to database
  addNewUser(name:string,email:string,password:string){
    let endPoint="/auth/register";
    
    console.log(email,password);
    let body={username:name,email:email,password:password};
    console.log("username:"+name,"email:"+email,"password:"+password);
    
    let header = { 'content-type': 'application/json' };
    return this.http.post(this.URL+endPoint,body,{'headers':header,responseType:'text'});
   
  }

  // Feteching all register users here
  getUsers(){
    let endPoint="/users";
     return this.http.get(this.URL+endPoint);
  }
}
