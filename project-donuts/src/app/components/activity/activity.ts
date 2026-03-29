
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivityService, ActivityLog } from '../../services/activity-service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class Activity implements OnInit {
  
  private logSource$: Observable<ActivityLog[]>;
  public sortedLog$: Observable<ActivityLog[]>;
  
  private sortOrderSubject = new BehaviorSubject<'asc' | 'desc'>('desc');
  public sortOrder$ = this.sortOrderSubject.asObservable(); 

  displayedColumns: string[] = ['date', 'actionName', 'productName'];

  constructor(private activityService: ActivityService, private router: Router) {
    this.logSource$ = this.activityService.activityLog$;
    
    this.sortedLog$ = combineLatest([this.logSource$, this.sortOrder$]).pipe(
        map(([logs, order]) => {
            return [...logs].sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            });
        })
    );
  }

  ngOnInit(): void { }

  toggleSort(): void {
    const currentOrder = this.sortOrderSubject.getValue();
    this.sortOrderSubject.next(currentOrder === 'desc' ? 'asc' : 'desc');
  }

  clearAllLogs(): void {
    if (confirm("האם למחוק את כל ההיסטוריה?")) {
        this.activityService.clearLog();
    }
  }
}
