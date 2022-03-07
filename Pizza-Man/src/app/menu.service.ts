import { Injectable } from '@angular/core';
import { CartRestService } from './cart-rest.service';
// import { CartService } from './cart.service';
import { CartModel } from './cart/cartModel';
import { MenuItemsRestService } from './menu-items-rest.service';
import { Recipe } from './menu/recipe';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  checkingIfUserHaveProducts = false;
  dummyCartArray:number[]=[];
  userRecipesInCart:CartModel[]=[]
  recipeItems: any[] = [];
  recipeObjArray: Recipe[] = [];
  //variables for filtering veg and non-veg
  isVegRecipeSelected = false;
  isNonVegRecipeSelected = false;
  //variables for filtering price range
  isRecipePriceEqualTo_100 = false;
  isRecipePriceBet_100to300 = false;
  isRecipePriceBet_300to600 = false;
  isRecipePriceAbove_600 = false;

  //variables for filtering rating
  isRecipeStarRating_1 = false;
  isRecipeStarRating_2 = false;
  isRecipeStarRating_3 = false;
  isRecipeStarRating_4 = false;
  isRecipeStarRating_5 = false;
  //Storing Filter Array here
  filterRecipeObject: Recipe[] = [];
  dummyRecipeObj: Recipe[] = [];
  dummyPriceRangeObj: Recipe[] = [];
  dummyRatingObj: Recipe[] = [];
  isQtyIncreased = false;
  isQtyDecreased = false;
  cartRecipesFromDb: CartModel[] = [];
  // private cartService:CartService,
  constructor(private MenuRestService: MenuItemsRestService, private cartRestService: CartRestService) {
    this.doCheck();
    
      this.getRecipes();
    
    this.getCartItemsFromServer();
    this.checkIfUserAlreadyHaveProductsInCart();
    // this.cartService.getCartItems();
    // console.log("im checking",this.cartRecipesFromDb);
   }
   
 ngDoCheck(){
   
  
  console.log("im checking",this.cartRecipesFromDb); 
//   this.checkingVegAndNonVegFilters();
//   this.checkingPriceRangeFilters();
//   this.checkingRatingFilters();
//   console.log("after checking price range",this.dummyRecipeObj);
    // this.checkIfUserAlreadyHaveProductsInCart()
}
doCheck(){
  if(this.cartRecipesFromDb.length==0 || localStorage.getItem('username')=='false')
  {
    this.recipeObjArray.forEach((recipe)=>{
       recipe.setRecipeQty=0;
    })
  }
  
}
getCartItemsFromServer(){
  this.cartRestService.getAllCartItems().subscribe((data: any) => {
    
    
    this.cartRecipesFromDb = data;
  },(error)=>{
    console.log(error);
    
  }
  )
  // this.cartService.getCartItems();
  
}
getRecipes() {
  this.recipeObjArray=[];
  // subscibing getMenuList() from menu-list-service file
  this.MenuRestService.getMenuList().subscribe(
    (itemsList: any) => {
      console.log("items list from database or server ", itemsList);

      this.recipeItems = itemsList;
      this.creatingObjectsForRecipes();
    },
    (error) => {
      console.log("Error when fetching data from menu list" + JSON.stringify(error));
    }
  )
  return this.recipeItems;
}
// Fetching Recipes from the //http://localhost:3000/menulist
creatingObjectsForRecipes() {
  for (let obj of this.recipeItems) {
    let recipe1 = new Recipe(obj.desc, obj.id, obj.img, obj.name, obj.price, obj.rating, obj.qty, obj.type)
    this.setRecipeObjectArray(recipe1);
  }
  console.log("This is recipe objects array", this.recipeObjArray);
}

setRecipeObjectArray(RecipeObject: Recipe) {
    this.recipeObjArray.push(RecipeObject);  
}

//copied
handleDecreaseButton(recipeId: number) {

  // this.isQtyDecreased=true;
  this.checkIfUserAlreadyHaveProductsInCart();
  console.log(recipeId);
  let decrease: number;
  let recipe = this.recipeObjArray.filter(recipeObj =>
    recipeObj.recipeId == recipeId
  )
  decrease = recipe[0].getRecipeQty;
  if (recipe[0].getRecipeQty > 0) {
    decrease -= 1;
    recipe[0].setRecipeQty = decrease;
    // updating cart qty in db
    if (localStorage.getItem('username') != 'false') {
      console.log("********************************");

      console.log("arre ikkda unnna ra nenu chusuko");

      let email = localStorage.getItem('username');
      let recipeId = recipe[0].recipeId;
      let recipeQty = recipe[0].getRecipeQty;
      let recipePrice = recipe[0].recipePrice;
      
      if(recipeQty!==0){
        if (this.checkingIfUserHaveProducts && this.dummyCartArray.includes(recipeId)) {
          this.cartRestService.updateQtyInCartDb(email,recipeId,recipeQty).subscribe(
            (data)=>{
              this.getCartItemsFromServer()
              // this.cartService.getCartItems();
            },
            (error)=>{
              console.log(error);
              
            })
          console.log("i think we are updating cart with decrese daa");
        }
        
      }
      else {
            // delete from cart table if qty is 0
            this.cartRestService.deleteRecipeFromCart(email,recipeId).subscribe({
              next :(data)=>{
                this.getCartItemsFromServer()
                // this.cartService.getCartItems();
              },
              error:(err)=>{
                console.log(err);
              }
            }
              )
      }
      //  this.cartRestService.updateQtyInCartDb(email,recipeId,recipeQty)
    }
  }
  console.log("Current recipe quantity", recipe[0].recipeQuantity, recipe);
  console.log("decrease array", this.recipeObjArray)

}
checkIfUserAlreadyHaveProductsInCart(){
  this.dummyCartArray=[];

  let user = localStorage.getItem('username');
  if (user !== 'false') {

    let userRecipes = this.cartRecipesFromDb.filter((item) => item.username == user);
    this.userRecipesInCart=userRecipes
    userRecipes.forEach((item)=>{
        this.dummyCartArray.push(item.recipeId);
        console.log("after pushing into dummy array",this.dummyCartArray);
        
    })
    console.log("maincontent", userRecipes);

    console.log("cart recipes", this.cartRecipesFromDb, userRecipes);
    this.getCartItemsFromServer()
    // this.cartService.getCartItems();
    this.checkingIfUserHaveProducts = userRecipes.length > 0 ? true : false;
  }
}
// Handling Recipe Decrease Button
handleIncreaseButton(recipeId: number) {
  this.checkIfUserAlreadyHaveProductsInCart();
  
  // this.isQtyIncreased=true;
  // console.log(recipeId);
  let increase: number;
  let recipe = this.recipeObjArray.filter(recipeObj =>
    recipeObj.recipeId == recipeId
  )
  increase = recipe[0].getRecipeQty;
  console.log(increase);

  if (recipe[0].getRecipeQty >= 0) {
    increase += 1;
    recipe[0].setRecipeQty = increase;
    if (localStorage.getItem('username') != 'false') {
      console.log("********************************");

      console.log("arre ikkda unnna ra nenu chusuko");

      let email = localStorage.getItem('username');
      let recipeId = recipe[0].recipeId;
      let userRecipe=this.userRecipesInCart.filter((item)=>item.recipeId==recipeId)
      let recipeQty = recipe[0].getRecipeQty;
      // if(userRecipe.length>0)
      // {
      //   recipeQty+=userRecipe[0].recipeQty
      // }
      let recipePrice = recipe[0].recipePrice;
      console.log(email);
      console.log(recipeId);
      console.log(recipeQty);
      if (this.checkingIfUserHaveProducts && this.dummyCartArray.includes(recipeId)) {
        this.cartRestService.updateQtyInCartDb(email,recipeId,recipeQty).subscribe(
          (data)=>{
            this.getCartItemsFromServer()
            // this.cartService.getCartItems();
          },
          (error)=>{
            console.log(error);
            
          }
        )
        console.log("i think we are updating cart", this.checkingIfUserHaveProducts);
      }
      else {
        this.cartRestService.addRecipeToCart(email,recipeId,recipeQty,recipePrice).subscribe(
          (data)=>{
            this.getCartItemsFromServer()
            // this.cartService.getCartItems();
          },
          (error)=>{
            console.log(error);
            
          }
        )
        console.log("i think we inserting into cart", this.checkingIfUserHaveProducts);
        this.checkIfUserAlreadyHaveProductsInCart();
        
      }
    }

  }
  console.log("currentRecipeQuantity", recipe[0].getRecipeQty, recipe);
  console.log("decrese array", this.recipeObjArray)
  
}

getRecipesFromMenu(): Recipe[]{
  return this.recipeObjArray;
}

}





