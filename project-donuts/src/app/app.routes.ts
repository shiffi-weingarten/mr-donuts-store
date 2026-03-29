

import { Routes } from '@angular/router';
import { Product } from './components/products/products'; 
import { Basket } from './components/basket/basket'; 
import { About } from './components/about/about'; 
import { Activity } from './components/activity/activity'; 
export const routes: Routes = [
    { path: 'products', component: Product, title: 'our products' },

    { path: 'cart', component: Basket, title: 'basket' },

    { path: 'about', component: About, title: 'about' },
    { path: 'activity', component: Activity, title: 'track' },

    { path: '', redirectTo: 'products', pathMatch: 'full' },
];