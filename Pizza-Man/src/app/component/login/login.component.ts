import { Component, OnInit, ViewChild } from '@angular/core';
import { customer } from './login.customer';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../../services/menuService/menu.service';
import { validateRegisterEmail } from '../register/formValidations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:customer[]=[];
  loginForm!:FormGroup;
  
  constructor(private fb: FormBuilder,private MenuService:MenuService,private http:HttpClient,private authService: AuthService, private router: Router, private header: HeaderComponent) { }

  ngOnInit(): void {
     this.getUsers();
     this.loginForm = this.fb.group({
      
      email: ["", [Validators.required,validateRegisterEmail]],
      password:["",Validators.required],
      
    });
  } 


  // handling link register here
  handleLinkRegister() {
    this.router.navigate(['register'])
  }

  // Fetching all users via authService
  getUsers(){
    this.authService.getUsers().subscribe(
      (jsonUsers:any)=>{
        this.users=jsonUsers;
      },
      (error)=>{
        console.log("Error while fetching users",JSON.stringify(error));
      })
  }


  // checking login details 
  onSubmitLogin() {
    // console.log("logg-----", this.loginForm.value);
    let email = this.loginForm.get(['email'])?.value;
    let password = this.loginForm.get(['password'])?.value;
    
    
    let userData=this.users.filter((user)=>user.email==email);
    if(userData.length>0){
      userData.forEach((user)=>{
       
        if(user.email==email && user.password==password)
        {
         localStorage.setItem("isLoggedIn",'true');
         if(localStorage.getItem("isLoggedIn")){
              localStorage.setItem('username',email);
              this.MenuService.getRecipes();
         }
         else{
          localStorage.setItem('username','false');
         }
         alert("Succusfully Logged In")
         this.router.navigate(['home'])
        }
        else{
          alert("please check your credentials")
        }
     }) 
    }
    else{
        alert("user don't have account please register")
        this.router.navigate(['register'])   
    }
    
    if (!this.loginForm.valid) {
      return;
    }
 
    
    this.loginForm.reset();
  }
  

}
