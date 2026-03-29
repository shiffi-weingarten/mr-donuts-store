import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../services/basket-service';
@Component({
  selector: 'app-site',
  imports: [RouterModule,RouterOutlet,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './site.html',
  styleUrl: './site.css',
  standalone:true
})
export class SiteComponent {
 constructor(public basketService :BasketService){}
}
