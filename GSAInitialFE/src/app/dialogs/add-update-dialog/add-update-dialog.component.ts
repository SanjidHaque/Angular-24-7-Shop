import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Product} from '../../models/product.model';


@Component({
  selector: 'app-add-update-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent {
  addNewProductForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addNewProductForm = new FormGroup({
      'name': new FormControl(data.name, Validators.required),
      'price': new FormControl(data.price, Validators.required),
      'quantity': new FormControl(data.quantity, Validators.required)
    });
  }

  cancelClick() {
    this.data.confirmationStatus = false;
    this.dialogRef.close('');
  }

  confirmClick() {
    this.data.confirmationStatus = true;

    const name = this.addNewProductForm.controls['name'].value;
    const price = this.addNewProductForm.controls['price'].value;
    const quantity = this.addNewProductForm.controls['quantity'].value;

    const product = new Product(null, name, price, quantity);

    this.dialogRef.close({
      confirmationStatus: this.data.confirmationStatus, product
    });
  }

}
