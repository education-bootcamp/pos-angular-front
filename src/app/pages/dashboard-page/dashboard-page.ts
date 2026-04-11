import { Component } from '@angular/core';
import { DashboardMainHeader } from './inner-pages/core/dashboard-main-header/dashboard-main-header';
import { DashboardMainFooter } from './inner-pages/core/dashboard-main-footer/dashboard-main-footer';
import { TabBar } from '../../dto/TabBar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardMainHeader, DashboardMainFooter, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  tabs: TabBar[] = [
    { label: 'Customers', path: 'customers', icon: '👥' },
    { label: 'Products', path: 'products', icon: '📦' },
    { label: 'Orders', path: 'orders', icon: '🧾' },
    { label: 'Place Order', path: 'place-order', icon: '➕' },
    { label: 'Statistics', path: 'statistics', icon: '📊' },
  ];
}
