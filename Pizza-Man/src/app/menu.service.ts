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
  dummyCartArray: number[] = [];
  userRecipesInCart: CartModel[] = []
  recipeItems: any[] = [];
  recipeObjArray: Recipe[] = [];
  cartRecipesFromDb: CartModel[] = [];
  // private cartService:CartService,
  constructor(private MenuRestService: MenuItemsRestService, private cartRestService: CartRestService) {
    this.doCheck();
    this.getRecipes();
    this.getCartItemsFromServer();
    this.checkIfUserAlreadyHaveProductsInCart();
  }


  // Chceking if user logged in meanse putting all recipes as zero
  doCheck() {
    if (this.cartRecipesFromDb.length == 0 || localStorage.getItem('username') == 'false') {
      this.recipeObjArray.forEach((recipe) => {
        recipe.setRecipeQty = 0;
      })
    }

  }
  // Fetching all cart items from server
  getCartItemsFromServer() {
    this.cartRestService.getAllCartItems().subscribe((data: any) => {
      this.cartRecipesFromDb = data;
    }, (error) => {
      console.log(error);
    }
    )
  }

  // Get all recipes 
  getRecipes() {
    this.recipeObjArray = [];
    // subscibing getMenuList() from menu-list-service file
    this.MenuRestService.getMenuList().subscribe(
      (itemsList: any) => {
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
    // console.log("This is recipe objects array", this.recipeObjArray);
  }

  // Pushing all recipes to RecipeObject Array
  setRecipeObjectArray(RecipeObject: Recipe) {
    this.recipeObjArray.push(RecipeObject);
  }

  // Handling Global DecreaseButton in cartPage and MenuPage
  handleDecreaseButton(recipeId: number) {
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
      // updating cart quantity in db
      if (localStorage.getItem('username') != 'false') {
        let email = localStorage.getItem('username');
        let recipeId = recipe[0].recipeId;
        let recipeQty = recipe[0].getRecipeQty;
        let recipePrice = recipe[0].recipePrice;
        if (recipeQty !== 0) {
          if (this.checkingIfUserHaveProducts && this.dummyCartArray.includes(recipeId)) {
            this.cartRestService.updateQtyInCartDb(email, recipeId, recipeQty).subscribe(
              (data) => {
                this.getCartItemsFromServer()
              },
              (error) => {
                console.log(error);

              })
          }
        }
        else {
          // delete from cart table whene quentity is 0
          this.cartRestService.deleteRecipeFromCart(email, recipeId).subscribe({
            next: (data) => {
              this.getCartItemsFromServer()
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
    }
  }
  // Check If user Already have  products in cart or not
  checkIfUserAlreadyHaveProductsInCart() {
    this.dummyCartArray = [];
    let user = localStorage.getItem('username');
    if (user !== 'false') {
      let userRecipes = this.cartRecipesFromDb.filter((item) => item.username == user);
      this.userRecipesInCart = userRecipes
      userRecipes.forEach((item) => {
        this.dummyCartArray.push(item.recipeId);
      })
      this.getCartItemsFromServer()
      this.checkingIfUserHaveProducts = userRecipes.length > 0 ? true : false;
    }
  }
  // Handling global Increase button in cart page and menu page
  handleIncreaseButton(recipeId: number) {
    this.checkIfUserAlreadyHaveProductsInCart();
    let increase: number;
    let recipe = this.recipeObjArray.filter(recipeObj =>
      recipeObj.recipeId == recipeId
    )
    increase = recipe[0].getRecipeQty;
    if (recipe[0].getRecipeQty >= 0) {
      increase += 1;
      recipe[0].setRecipeQty = increase;
      if (localStorage.getItem('username') != 'false') {
        let email = localStorage.getItem('username');
        let recipeId = recipe[0].recipeId;
        let userRecipe = this.userRecipesInCart.filter((item) => item.recipeId == recipeId)
        let recipeQty = recipe[0].getRecipeQty;
        let recipePrice = recipe[0].recipePrice;
        
        if (this.checkingIfUserHaveProducts && this.dummyCartArray.includes(recipeId)) {
          this.cartRestService.updateQtyInCartDb(email, recipeId, recipeQty).subscribe(
            (data) => {
              this.getCartItemsFromServer()
            },
            (error) => {
              console.log(error);
            }
          )
        }
        else {
          this.cartRestService.addRecipeToCart(email, recipeId, recipeQty, recipePrice).subscribe(
            (data) => {
              this.getCartItemsFromServer()
            },
            (error) => {
              console.log(error);

            }
          )
          this.checkIfUserAlreadyHaveProductsInCart();
        }
      }

    }
  }


  getRecipesFromMenu(): Recipe[] {
    return this.recipeObjArray;
  }

}





