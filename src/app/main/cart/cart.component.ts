// Import des modules nécessaires
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FoodService } from '../../services/food.service';
import { CartItem } from '../../models/CartItem';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  // Propriétés du composant
  visible: boolean = false;
  emptyCartMsg: string = "! Oops Your Cart is Empty";
  cart!: Cart;
  constructor(private cartService: CartService, private foodSr: FoodService, private auth: AuthService, private route: Router) {
    !this.auth.isLoggedIn() ? this.route.navigateByUrl('/login') : "";
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }
  ngOnInit(): void {
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInStr: string) {
    const quantity = parseInt(quantityInStr);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}