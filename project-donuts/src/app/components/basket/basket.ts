import { Component,OnInit } from '@angular/core';
import { CommonModule,CurrencyPipe,AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BasketService,CartItem } from '../../services/basket-service';
import { from, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ActivityService } from '../../services/activity-service';

@Component({
  selector: 'app-basket',
  imports: [CommonModule,    
    AsyncPipe,        
    CurrencyPipe,     
    MatButtonModule,  
    MatIconModule,RouterModule],
  templateUrl: './basket.html',
  styleUrl: './basket.css',
})
export class Basket implements OnInit {
  cartItem$: Observable<CartItem[]>;
  totalCartPrice$: Observable<number>;

  constructor(private basketService: BasketService,private activityService:ActivityService) {
    this.cartItem$ = this.basketService.cartItem$;
    this.totalCartPrice$ = this.basketService.totalCartPrice$;
  }
  ngOnInit(): void {
  }


  increaseQuantity(item: CartItem): void {
    this.basketService.addToCart(item); 
    this.activityService.addLog("שינוי כמות (+1)", item.name);
  }
  decreaseQuantity(itemId: number): void {
      const currentItems = this.basketService.getCurrentCartItems();  
      const item = currentItems.find(i => i.id === itemId);
      this.basketService.decreaseAmount(itemId);

        if (item) {
            if (item.amount > 1) {
                this.activityService.addLog("שינוי כמות (-1)", item.name);
            } else { 
                this.activityService.addLog("מחיקת פריט מהסל (כמות 1)", item.name);
            }
        }


  }
  deleteItem(itemId: number): void {
        const currentItems = this.basketService.getCurrentCartItems();
        const item = currentItems.find(i => i.id === itemId);

        this.basketService.deleteItem(itemId);

        if (item) {

            this.activityService.addLog("מחיקת פריט מהסל", item.name);
        }
    }
}
