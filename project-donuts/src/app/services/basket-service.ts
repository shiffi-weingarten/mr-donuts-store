import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ProductModel } from '../models/product-model';

export interface CartItem extends ProductModel {
  amount: number;
  totalPrice: number;
}


@Injectable({
  providedIn: 'root',
})


export class BasketService {

  private cartItemSubject = new BehaviorSubject<CartItem[]>([]);

  public cartItem$: Observable<CartItem[]> = this.cartItemSubject.asObservable();

  public get totalItemAmount$(): Observable<number> {
    return this.cartItem$.pipe(
      map(items => items.reduce((count, item) => count + item.amount, 0))
    )
  }
  public get totalCartPrice$(): Observable<number> {
    return this.cartItem$.pipe(
      map(items => items.reduce((total, item) => total + item.totalPrice, 0))
    );
  }



  addToCart(product: ProductModel): void {
    const currentItems = this.cartItemSubject.getValue();
    const existingItem = currentItems.find(i => i.id === product.id);
    if (existingItem) {
      existingItem.amount++;
      existingItem.totalPrice = existingItem.amount * existingItem.priceUSD;
    }
    else {
      currentItems.push({
        ...product,
        amount: 1,
        totalPrice: product.priceUSD
      });
    }
    this.cartItemSubject.next(currentItems);
  }

  decreaseAmount(productId: number): void {
    const currentItems = this.cartItemSubject.getValue();
    const itemToUpdate = currentItems.find(i => i.id === productId);
    if (itemToUpdate) {
      if (itemToUpdate.amount > 1) {
        itemToUpdate.amount--;
        itemToUpdate.totalPrice = itemToUpdate.amount * itemToUpdate.priceUSD;
        this.cartItemSubject.next(currentItems);
      } else {
        this.deleteItem(productId);
        };
      }
    }

    deleteItem(productId: number):void{
      const currentItems=this.cartItemSubject.getValue();
      const updatedItems=currentItems.filter(i=>i.id!=productId);
      this.cartItemSubject.next(updatedItems);

    }

    getCurrentCartItems(): CartItem[] {
    return this.cartItemSubject.getValue();
  }
  }





