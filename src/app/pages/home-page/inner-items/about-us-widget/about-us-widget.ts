import { Component, inject } from '@angular/core';
import { TeamMember } from '../../../../dto/TeamMember';
import { Value } from '../../../../dto/Value';


@Component({
  selector: 'app-about-us-widget',
  imports: [],
  templateUrl: './about-us-widget.html',
  styleUrl: './about-us-widget.scss',
})
export class AboutUsWidget {

  values: Value[] = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      desc: 'Process transactions in under 2 seconds. No lag, no freezes, no lost sales.'
    },
    {
      icon: '🔒',
      title: 'Bank-Grade Security',
      desc: 'PCI DSS compliant with end-to-end encryption on every payment.'
    },
    {
      icon: '📊',
      title: 'Real-Time Insights',
      desc: 'Live dashboards that give you the data you need, exactly when you need it.'
    }
  ];

  team: TeamMember[] = [
    { name: 'Alex Kim', initials: 'AK' },
    { name: 'Sara Chen', initials: 'SC' },
    { name: 'Raj Patel', initials: 'RP' },
    { name: 'Mia Torres', initials: 'MT' },
    { name: '+36 more', initials: '+36' }
  ];
}
