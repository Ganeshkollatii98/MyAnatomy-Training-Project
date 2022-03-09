import { Component } from '@angular/core';
import { CartService } from './services/cartService/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pizza-Man';
  constructor(private cartService:CartService){

  }
}
