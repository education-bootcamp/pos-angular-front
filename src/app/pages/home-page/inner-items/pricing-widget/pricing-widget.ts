import { Component } from '@angular/core';
import { Plan } from '../../../../dto/Plan';

@Component({
  selector: 'app-pricing-widget',
  imports: [],
  templateUrl: './pricing-widget.html',
  styleUrl: './pricing-widget.scss',
})
export class PricingWidget {
  isAnnual = false;

  plans: Plan[] = [
    {
      icon: '🌱',
      name: 'Starter',
      desc: 'Perfect for small shops and solo operators getting started.',
      monthlyPrice: 29,
      annualPrice: 23,
      featured: false,
      cta: 'Get Started',
      features: [
        { label: '1 Terminal / Register', included: true },
        { label: 'Up to 500 products', included: true },
        { label: 'Basic Sales Reports', included: true },
        { label: 'Email Support', included: true },
        { label: 'Multi-location Support', included: false },
        { label: 'Inventory Sync', included: false },
        { label: 'API Access', included: false },
      ]
    },
    {
      icon: '⚡',
      name: 'Pro',
      desc: 'For growing businesses that need more power and flexibility.',
      monthlyPrice: 79,
      annualPrice: 63,
      featured: true,
      cta: 'Start Free Trial',
      features: [
        { label: 'Up to 5 Terminals', included: true },
        { label: 'Unlimited Products', included: true },
        { label: 'Advanced Analytics', included: true },
        { label: 'Priority Support', included: true },
        { label: 'Multi-location Support', included: true },
        { label: 'Inventory Sync', included: true },
        { label: 'API Access', included: false },
      ]
    },
    {
      icon: '🏢',
      name: 'Enterprise',
      desc: 'Custom solutions for large retail chains and franchises.',
      monthlyPrice: 199,
      annualPrice: 159,
      featured: false,
      cta: 'Contact Sales',
      features: [
        { label: 'Unlimited Terminals', included: true },
        { label: 'Unlimited Products', included: true },
        { label: 'Custom Reports & BI', included: true },
        { label: '24/7 Dedicated Support', included: true },
        { label: 'Multi-location Support', included: true },
        { label: 'Inventory Sync', included: true },
        { label: 'Full API Access', included: true },
      ]
    }
  ];

  footerItems = [
    { icon: '✅', label: 'No credit card required' },
    { icon: '🔄', label: 'Cancel anytime' },
    { icon: '🔒', label: 'SOC 2 & PCI compliant' },
    { icon: '💬', label: '14-day free trial' },
  ];

  toggleBilling(): void {
    this.isAnnual = !this.isAnnual;
  }

  onSelectPlan(plan: Plan): void {
    console.log('Selected plan:', plan.name);
  }
}
