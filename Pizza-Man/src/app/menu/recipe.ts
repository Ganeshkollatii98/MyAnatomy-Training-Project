export class Recipe{
    recipeId!:number;
    recipeName!:string;
    recipeDescirption!:string;
    recipeIamge!:string;
    recipePrice!:number;
    recipeRating!:number;
    recipeQuantity!:number;
    recipeType!:string;
    createAt!:Date;
    updatedAt!:Date;
    private recipeCurrentQty=0;
    constructor(desc:string,id:number,img:string,name:string,price:number,rating:number,qty:number,type:string){
        this.recipeId=id;
        this.recipeName=name;
        this.recipeDescirption=desc;
        this.recipeIamge=img;
        this.recipePrice=price;
        this.recipeQuantity=qty;
        this.recipeType=type;
        this.recipeRating=rating;
        this.createAt=new Date();
        this.updatedAt=new Date();
        
        // this.recipeCurrentQty=0;
        
    }
    set setRecipeQty(qty:number){
        this.recipeCurrentQty=qty;
    }

    get getRecipeQty(){
        return this.recipeCurrentQty;
    }
    
}