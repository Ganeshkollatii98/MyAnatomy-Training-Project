//  Cart model using for cart recipes
export class CartModel{
    username!:string;
    orderId!:number;
    recipeId!:number;
    recipeQty!:number;
    recipePrice!:number;
    constructor(uname:string,oid:number,rid:number,rqty:number,rprice:number){
        this.username=uname;
        this.orderId=oid;
        this.recipeId=rid;
        this.recipeQty=rqty;
        this.recipePrice=rprice;
    }
}