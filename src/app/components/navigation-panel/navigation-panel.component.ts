import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.sass'],
})
export class NavigationPanelComponent {
  navigationItems: any = [
    {
      pageName: 'YOUR INFO',
      stepName: 'STEP 1',
      number: '1',
      url: 'info',
    },
    {
      pageName: 'SELECT PLAN',
      stepName: 'STEP 2',
      number: '2',
      url: 'plan',
    },
    {
      pageName: 'ADD-ONS',
      stepName: 'STEP 3',
      number: '3',
      url: 'adds',
    },
    {
      pageName: 'SUMMARY',
      stepName: 'STEP 4',
      number: '4',
      url: 'summary',
    },
  ];
}
