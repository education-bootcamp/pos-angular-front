import { Component, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Customer } from '../../../../dto/Customer';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerService } from '../../../../services/customer-service';
import {
  CustomerCreateDialogComponent
} from './inner/customer-create-dialog-component/customer-create-dialog-component';
import {
  CustomerUpdateDialogComponent
} from './inner/customer-update-dialog-component/customer-update-dialog-component';

@Component({
  selector: 'app-customers',
  imports: [MatIcon, FormsModule, NgIf, NgForOf, CurrencyPipe, MatTooltip, MatPaginator],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers implements OnInit {
  // Signals drive the template so updates from async subscribe() callbacks
  // are picked up correctly under zoneless change detection (fixes NG0100).
  pagedCustomers = signal<Customer[]>([]);
  totalRecords = signal(0);
  loading = signal(false);

  searchTerm = '';
  currentPage = 1;
  pageSize = 10;

  private searchSubject = new Subject<string>();

  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(350), distinctUntilChanged()).subscribe(() => {
      this.currentPage = 1;
      this.fetchCustomers();
    });
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.loading.set(true);
    const pageIndex = this.currentPage - 1; // backend assumed 0-indexed
    this.customerService.getAllCustomers(this.searchTerm.trim(), pageIndex, this.pageSize).subscribe({
      next: (res: any) => {
        // Backend response shape: { code, message, data: { dataCount, dataList } }
        const payload = res?.data;

        if (payload) {
          this.pagedCustomers.set(payload.dataList ?? []);
          this.totalRecords.set(payload.dataCount ?? payload.dataList?.length ?? 0);
        } else {
          this.pagedCustomers.set([]);
          this.totalRecords.set(0);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Failed to load customers', 'Close', { duration: 3000 });
      },
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.fetchCustomers();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.fetchCustomers();
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(CustomerCreateDialogComponent, {
      width: '480px',
      panelClass: 'custom-dialog',
    });
    ref.afterClosed().subscribe((result: Customer | undefined) => {
      if (result) {
        this.snackBar.open('Customer created successfully', 'Close', { duration: 2500 });
        this.currentPage = 1;
        this.fetchCustomers();
      }
    });
  }

  openUpdateDialog(customer: Customer): void {
    const ref = this.dialog.open(CustomerUpdateDialogComponent, {
      width: '480px',
      panelClass: 'custom-dialog',
      data: { ...customer },
    });
    ref.afterClosed().subscribe((result: Customer | undefined) => {
      if (result) {
        this.snackBar.open('Customer updated successfully', 'Close', { duration: 2500 });
        this.fetchCustomers();
      }
    });
  }

  deleteCustomer(id: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.snackBar.open('Customer deleted', 'Close', { duration: 2500 });
        if (this.pagedCustomers().length === 1 && this.currentPage > 1) {
          this.currentPage--;
        }
        this.fetchCustomers();
      },
      error: () => {
        this.snackBar.open('Failed to delete customer', 'Close', { duration: 3000 });
      },
    });
  }
}