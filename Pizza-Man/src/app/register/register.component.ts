import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { customer } from '../login/login.customer';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { validateRegisterEmail, validateUserName } from './formValidations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Register component variables 
  users: customer[] = this.login.users;
  isUserAlreayHaveAcount = false;
  userRegistrationForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router, private login: LoginComponent) { 
    // Form Group Declarations
    this.userRegistrationForm = this.fb.group({
      username: ["", [Validators.required,validateUserName]],
      email: ["", [Validators.required,validateRegisterEmail]],
      password:["",Validators.required],
      cpassword:[""]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
  ngDoCheck() {

  }
  // Fetching all register users with the help of auth service
  getUsers() {
    this.authService.getUsers().subscribe(
      (jsonUsers: any) => {
        this.users = jsonUsers;
      },
      (error) => {
        console.log("Error while fetching users", JSON.stringify(error));

      })
  }

  // If user already have account means it will go to login page
  onClickAlreadyHaveAccount() {
    this.router.navigate(["login"])
  }

  // Handling Register button on Register page and storing in the database
  onSubmitRegister() {
    let username=this.userRegistrationForm.get(['username'])?.value;
    let email=this.userRegistrationForm.get(['email'])?.value;
    let password=this.userRegistrationForm.get(['password'])?.value;
    let cpassword=this.userRegistrationForm.get(['cpassword'])?.value;
    console.log(this.users);
    let user: customer[] = []
    console.log(email);

    user = this.users.filter((u) =>u.email == email)
    // Checking if user already have account or not
    if (user.length > 0) {
      this.isUserAlreayHaveAcount = true;
    }
    else {
      let usersCount = this.users.length;
      let id = usersCount + 1
      this.isUserAlreayHaveAcount = false;
      // Adding new user
      this.authService.addNewUser(username, email, password).subscribe(
        (jsonData) => {
          this.authService.getUsers();
          alert("Registered Successfully")
          this.router.navigate(['login'])
        }, (error) => {
          console.log("Got errow when adding new user", error);
        }
      )
    }
    //  Reseting all inputs 
    this.userRegistrationForm.reset() 
  }
}
