import { Component, Inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../../../../dto/Customer';
import { CustomerService } from '../../../../../../services/customer-service';

@Component({
  selector: 'app-customer-update-dialog-component',
  imports: [MatIcon, ReactiveFormsModule, NgIf],
  templateUrl: './customer-update-dialog-component.html',
  styleUrl: './customer-update-dialog-component.scss',
})
export class CustomerUpdateDialogComponent implements OnInit {
  form: FormGroup;
  saving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      salary: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.data.name,
      address: this.data.address,
      salary: this.data.salary,
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    const payload: Customer = { ...this.data, ...this.form.value };

    this.customerService.updateCustomer(this.data.id, payload).subscribe({
      next: (updated: Customer) => {
        this.saving = false;
        this.dialogRef.close(updated ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'Failed to update customer. Please try again.';
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
