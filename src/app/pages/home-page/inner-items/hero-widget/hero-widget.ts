import { Component, OnInit } from '@angular/core';
import { Stat } from '../../../../dto/Stat';

@Component({
  selector: 'app-hero-widget',
  imports: [],
  templateUrl: './hero-widget.html',
  styleUrl: './hero-widget.scss',
})
export class HeroWidget  implements OnInit {
  barWidth = 0;

  stats: Stat[] = [
    { value: '10K+', label: 'Businesses' },
    { value: '$2B+', label: 'Processed' },
    { value: '99.9%', label: 'Uptime' },
  ];

  ngOnInit(): void {
    // Animate progress bar on load
    setTimeout(() => { this.barWidth = 83; }, 400);
  }

  onGetStarted(): void {
    console.log('Get Started clicked');
  }

  onWatchDemo(): void {
    console.log('Watch Demo clicked');
  }
}
