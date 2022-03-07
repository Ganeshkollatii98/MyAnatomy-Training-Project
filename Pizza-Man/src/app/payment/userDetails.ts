export class UserDetails{
    email!:string;
    address!:string;
    phonenumber!:string;
    pincode!:number;
    constructor(e:string,a:string,ph:string,p:number){
        this.email=e;
        this.address=a;
        this.phonenumber=ph;
        this.pincode=p;
    }
}
