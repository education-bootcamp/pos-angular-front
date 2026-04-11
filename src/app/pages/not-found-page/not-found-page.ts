import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuickLink } from '../../dto/QuickLink';

@Component({
  selector: 'app-not-found-page',
  imports: [],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {
   quickLinks: QuickLink[] = [
    { icon: '🏠', label: 'Home',      href: '/'        },
    { icon: '💰', label: 'Pricing',   href: '/#pricing' },
    { icon: '🏢', label: 'About Us',  href: '/#about'  },
    { icon: '💬', label: 'Contact',   href: '/#contact' },
  ];

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    history.back();
  }
}
