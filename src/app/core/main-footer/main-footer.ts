import { Component } from '@angular/core';
import { FooterColumn } from '../../dto/FooterColumn';
import { NavLink } from '../../dto/NavLink';
import { Social } from '../../dto/Social';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-footer',
  imports: [FormsModule],
  templateUrl: './main-footer.html',
  styleUrl: './main-footer.scss',
})
export class MainFooter {
  currentYear = new Date().getFullYear();
  email = '';

  socials: Social[] = [
    { icon: '𝕏', label: 'Twitter / X', href: '#' },
    { icon: 'in', label: 'LinkedIn',   href: '#' },
    { icon: '▶', label: 'YouTube',     href: '#' },
    { icon: '💬', label: 'Discord',    href: '#' },
  ];

  columns: FooterColumn[] = [
    {
      heading: 'Product',
      links: [
        { label: 'Features',      href: '#' },
        { label: 'Pricing',       href: '#pricing' },
        { label: 'Integrations',  href: '#' },
        { label: 'Changelog',     href: '#' },
        { label: 'Roadmap',       href: '#' },
      ]
    },
    {
      heading: 'Solutions',
      links: [
        { label: 'Retail Stores', href: '#' },
        { label: 'Restaurants',   href: '#' },
        { label: 'Hospitality',   href: '#' },
        { label: 'E-commerce',    href: '#' },
        { label: 'Enterprise',    href: '#' },
      ]
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Blog',          href: '#' },
        { label: 'Case Studies',  href: '#' },
        { label: 'Help Center',   href: '#' },
      ]
    },
    {
      heading: 'Company',
      links: [
        { label: 'About Us',   href: '#about' },
        { label: 'Careers',    href: '#' },
        { label: 'Press Kit',  href: '#' },
        { label: 'Partners',   href: '#' },
        { label: 'Contact',    href: '#contact' },
      ]
    }
  ];

  legalLinks: NavLink[] = [
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms of Service',  href: '#' },
    { label: 'Cookie Policy',     href: '#' },
  ];

  onSubscribe(): void {
    if (!this.email) return;
    console.log('Subscribed:', this.email);
    this.email = '';
  }
}

