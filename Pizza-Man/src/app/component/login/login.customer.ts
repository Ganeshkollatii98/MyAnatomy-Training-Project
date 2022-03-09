
export class customer{
   name:string="";
   email:string="";
   
   password:string="";
   cpassword:string="";
   
   
    constructor(name:string,email:string,password:string,cpassword:string){
        
        this.name=name;
        this.email=email;
        this.password=password;
        this.cpassword=cpassword;
    }
}