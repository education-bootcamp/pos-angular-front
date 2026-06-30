import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../../../../services/customer-service';
import { Customer } from '../../../../../../dto/Customer';

@Component({
  selector: 'app-customer-create-dialog-component',
  imports: [MatIcon, ReactiveFormsModule, NgIf],
  templateUrl: './customer-create-dialog-component.html',
  styleUrl: './customer-create-dialog-component.scss',
})
export class CustomerCreateDialogComponent {
  form: FormGroup;
  saving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerCreateDialogComponent>,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      salary: [null, [Validators.required, Validators.min(0)]],
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    const payload: Customer = this.form.value;

    this.customerService.saveCustomer(payload).subscribe({
      next: (created: Customer) => {
        this.saving = false;
        this.dialogRef.close(created ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'Failed to create customer. Please try again.';
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
