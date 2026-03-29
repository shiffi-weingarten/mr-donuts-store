import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product-model';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms'; 
import { dialog } from '../../models/dialog';

export interface DialogData extends dialog {
    product: ProductModel;
}

@Component({
    selector: 'app-mat-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogModule,
        MatIconModule, 
        FormsModule 
    ],
    templateUrl: './mat-dialog.html',
    styleUrls: ['./mat-dialog.css']
})
export class MatDialogConfirmation {
    amount: number = 1; 

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialogRef: MatDialogRef<any, any>
    ) {}

    increaseAmount(): void {
        this.amount++;
    }

    decreaseAmount(): void {
        if (this.amount > 1) {
            this.amount--;
        }
    }

    closePopup(doAction: boolean) {
        if (doAction){
            this.dialogRef.close({
                product: this.data.product,
                amount: this.amount 
            });
        } else {
            this.dialogRef.close(null);
        }
    }
}