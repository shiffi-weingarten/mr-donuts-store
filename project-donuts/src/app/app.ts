
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SiteComponent } from './components/site/site';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
// ...

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [SiteComponent, RouterOutlet, MatDialogModule, CommonModule],
    templateUrl: './app.html',
    styleUrl: './app.css',
})


export class App {
    protected readonly title = signal('project');
}