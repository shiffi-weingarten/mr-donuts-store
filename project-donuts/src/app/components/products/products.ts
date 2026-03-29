import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product-model';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmation } from '../mat-dialog/mat-dialog';
import { PipeDepartmentStylePipe } from '../../pipes/pipe-department-style-pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BasketService } from '../../services/basket-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivityService } from '../../services/activity-service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, PipeDepartmentStylePipe, MatDialogModule,
    MatButtonModule,
    MatIconModule, MatSnackBarModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Product implements OnInit {
  product: ProductModel[] = [];

  constructor(private dialog: MatDialog, private basketService: BasketService, private snackBar: MatSnackBar, private router: Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.initializeProducts();
  }

  openProductDetails(item: ProductModel): void {
    console.log('Opening details for:', item);
    const dialogRef = this.dialog.open(MatDialogConfirmation, {
      width: '380px', 
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container', 
      data: {
        product: item,
        title: item.name,
        message: item.details
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.product && result.amount > 0) {
        this.addToCartMultipleTimes(result.product, result.amount);
        this.showSnackBar(result.product.name, result.amount);
      }
    });
  }

  addToCartMultipleTimes(product: ProductModel, amount: number): void {
    for (let i = 0; i < amount; i++) {
      this.basketService.addToCart(product);
    }
    this.activityService.addLog("add to cart", `${product.name} (amount: ${amount})`);
  }

  addToCart(item: ProductModel): void {
    this.addToCartMultipleTimes(item, 1);
    this.showSnackBar(item.name, 1);
  }

  showSnackBar(productName: string, amount: number): void {
    const message = `${amount} ${productName} added to cart! 🛒`;
    const snackBarRef = this.snackBar.open(message, 'View Cart 🛒', {
      duration: 3000,
      panelClass: ['snackbar-success', 'snackbar-top-right'],
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
    snackBarRef.onAction().subscribe(() => {
      this.navigateToCart();
    });
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  initializeProducts(): void {
    this.product = [
      {
        id: 100,
        name: 'big donut',
        description: 'big donut',
        priceUSD: 4,
        departmentId: 1,
        imageUrl: '/bigDonut.jpg',
        details: 'הדונאטס הקלאסי, קוטר כ10 ס"מ, עם קישוטים שונים'
      },
      {
        id: 101,
        name: 'Large Oreo Donuts',
        description: 'Large Oreo Donuts',
        priceUSD: 4,
        departmentId: 1,
        imageUrl: '/LargeOreoDonuts.jpg',
        details: 'הדונאטס הקלאסי, קוטר כ10 ס"מ, בציפוי וניל עם שיברי עוגיית אוראו'
      },
      {
        id: 102,
        name: 'Large HazleNut Cream Donuts',
        description: 'Large HazleNut Cream Donuts',
        priceUSD: 4,
        departmentId: 1,
        imageUrl: '/LargeHazleNutCreamDonuts.jpg',
        details: 'Classic donuts, about 10 cm in diameter, topped with Nutella and roasted crushed peanuts.'
      },
      {
        id: 103,
        name: 'Large Lotus Donuts',
        description: 'Large Lotus Donuts',
        priceUSD: 4,
        departmentId: 1,
        imageUrl: '/LargeLotusDonuts.jpg',
        details: 'הדונאטס הקלאסי, קוטר כ10 ס"מ, בציפוי וניל עם שיברי ביסקוויט לוטוס'
      },
      {
        id: 104,
        name: 'kinder Flavored Cupcakess',
        description: 'kinder Flavored Cupcakess',
        priceUSD: 12,
        departmentId:2,
        imageUrl: '/kinderFlavoredCupcakes.jpg',
        details: 'Six-pack of Kinder-flavored cupcakes'
      },
      {
        id: 105,
        name: 'Colorful Cupcakes',
        description: 'Colorful Cupcakes',
        priceUSD: 12,
        departmentId:2,
        imageUrl: '/ColorfulCupcakesjpg.jpg',
        details: 'Six-pack of colorful mixed cupcakes'
      },
      {
        id: 106,
        name: 'lotus Flavored Cupcakes',
        description: 'lotus Flavored Cupcakes',
        priceUSD: 12,
        departmentId:2,
        imageUrl: '/lotusFlavoredCupcakes.jpg',
        details: 'Six-pack of lotus-flavored cupcakes'
      },
      {
        id: 107,
        name: 'snickers Flavored Cupcakes',
        description: 'snickers Flavored Cupcakes',
        priceUSD: 12,
        departmentId:2,
        imageUrl: '/snickersFlavoredCupcakes.jpg',
        details: 'Snickers-flavored cupcakes six-pack'
      }
      ,
      {
        id: 108,
        name: 'mini Donuts Colorful Box',
        description: 'mini Donuts Colorful Box',
        priceUSD: 35,
        departmentId:3,
        imageUrl: '/miniDonutsColorfulBox.jpg',
        details: 'A box of colorful donuts'
      },
      {
        id: 109,
        name: 'mini Donuts Oreo Box',
        description: 'mini Donuts Oreo Box',
        priceUSD: 35,
        departmentId:3,
        imageUrl: '/miniDonutsOreoBox.jpg',
        details: 'A box of oreo donuts'
      },
      {
        id: 110,
        name: 'mini Donuts Cream HazleNut Box',
        description: 'mini Donuts Cream HazleNut Box',
        priceUSD: 35,
        departmentId:3,
        imageUrl: '/miniDonutsCreamHazleNutBox.jpg',
        details: 'A box of hazelnut cream donuts'
      },
      {
        id: 111,
        name: 'mini Donuts Lutos Box',
        description: 'mini Donuts Lutos Box',
        priceUSD: 35,
        departmentId:3,
        imageUrl: '/miniDonutsLutosBox.jpg',
        details: 'A box of lotus donuts'
      },
      {
        id: 112,
        name: 'Colorful Belgian Waffle Mix',
        description: 'Colorful Belgian Waffle Mix',
        priceUSD: 8,
        departmentId:4,
        imageUrl: '/ColorfulBelgianWaffleMixjpg.jpg',
        details: 'Belgian waffle package, 6 units in a variety of flavors'
      },
      {
        id: 113,
        name: 'oreo Belgian Waffle',
        description: 'oreo Belgian Waffle',
        priceUSD: 8,
        departmentId:4,
        imageUrl: '/oreoBelgianWaffle.jpg',
        details: 'Belgian waffle pack, 6 units, Oreo flavor'
      },
      {
        id: 114,
        name: 'lutos Belgian Waffle',
        description: 'lutos Belgian Waffle',
        priceUSD: 8,
        departmentId:4,
        imageUrl: '/lutosBelgianWaffle.jpg',
        details: 'Belgian waffle pack, 6 units, Lotus flavor'
      },
      {
        id: 115,
        name: 'hazle Nut Belgian Waffle',
        description: 'hazle Nut Belgian Waffle',
        priceUSD: 8,
        departmentId:4,
        imageUrl: '/hazleNutBelgianWaffle.jpg',
        details: 'Belgian waffle package, 6 units, Nutella and roasted peanut flavor'
      },
      {
        id: 116,
        name: 'pancakes With Maple',
        description: 'pancakes With Maple',
        priceUSD: 18,
        departmentId:5,
        imageUrl: '/pancakeWithMapel.jpg',
        details: 'A luxurious stack of gourmet pancakes with caramelized fruit, a nutty crunch, and a sweet, glistening drizzle.'
      },
      {
        id: 117,
        name: 'Pancakes With Strawberries',
        description: 'Pancakes With Strawberries',
        priceUSD: 18,
        departmentId:5,
        imageUrl: '/pancakeWithStrawberry.jpg',
        details: 'A stack of fluffy pancakes topped with fresh strawberries and powdered sugar'
      },
      {
        id: 118,
        name: 'Pancakes With Whipped Cream',
        description: 'Pancakes With Whipped Cream',
        priceUSD: 18,
        departmentId:5,
        imageUrl: '/pancakeWithWhippedCream.jpg',
        details: 'A decadent stack of mini chocolate pancakes topped with fluffy whipped cream'
      },
      {
        id: 119,
        name: 'Colorful Pancakes',
        description: 'Colorful Pancakes',
        priceUSD: 18,
        departmentId:5,
        imageUrl: '/colorfulPancakes.jpg',
        details: 'Fluffy rainbow pancakes with whipped cream and sprinkles'
      },
      {
        id: 120,
        name: 'Colorfull Jelly Donuts',
        description: 'Colorfull Jelly Donuts',
        priceUSD: 12,
        departmentId:6,
        imageUrl: '/jellyDonutColorful.jpg',
        details: 'Stunning gourmet donut with chocolate and rainbow sprinkles'
      },
      {
        id: 121,
        name: 'Jelly Donuts With Biscotti',
        description: 'Jelly Donuts With Biscotti',
        priceUSD: 12,
        departmentId:6,
        imageUrl: '/jellyDonutsWithBiscotti.jpg',
        details: 'Irresistible Biscoff donuts featuring a rich caramel glaze and crunchy cookie crumble'
      },
      {
        id: 122,
        name: 'Jelly Donuts With Chocolate',
        description: 'Jelly Donuts With Chocolate',
        priceUSD: 12,
        departmentId:6,
        imageUrl: '/jellyDonutsWithChoclate.jpg',
        details: 'A gourmet donut filled with caramel or chocolate and topped with nuts'
      },
      {
        id: 123,
        name: 'Jelly Donut With Chocolate Cream',
        description: 'Jelly Donuts With Chocolate Cream',
        priceUSD: 12,
        departmentId:6,
        imageUrl: '/jellyDonutWithCream.jpg',
        details: 'Golden mini-donuts topped with chocolate cream and nuts'
      }
    ];
  }
}