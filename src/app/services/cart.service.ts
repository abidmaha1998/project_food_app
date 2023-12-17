import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cart } from '../models/cart';
import { CartItem } from '../models/CartItem';
import { Food } from '../models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.getInitialCart());
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {
    this.initializeCart();
  }

  private getInitialCart(): Cart {
    return {
      items: [],
      totalPrice: 0,
      totalCount: 0,
    };
  }

  private initializeCart(): void {
    this.getCartFromServer().subscribe(
      (data) => {
        const cart = data || this.getInitialCart();
        this.cartSubject.next(cart);
      },
      (error) => {
        console.error('Error fetching cart from server', error);
      }
    );
  }

  addToCart(food: Food): void {
    const cart = this.cartSubject.value;
    const cartItem = cart.items.find((item) => item.food.id === food.id);

    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
    } else {
      cart.items.push(new CartItem(food));
      this.setCartState(cart);
    }
  }

  removeCartItem(foodId: number): void {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter((item) => item.food.id !== foodId);
    this.setCartState(cart);
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  changeQuantity(foodId: number, quantity: number): void {
    const cart = this.cartSubject.value;
    const cartItem = cart.items.find((item) => item.food.id === foodId);

    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
      this.setCartState(cart);
    }
  }

  private getCartFromServer(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  private setCartState(cart: Cart): void {
    cart.totalPrice = cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    cart.totalCount = cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    this.cartSubject.next(cart);
    this.saveCartToServer(cart);
  }

  private saveCartToServer(cart: Cart): void {
    this.http.put<Cart>(this.apiUrl, cart).subscribe();
  }
}