import { Component } from '@angular/core';
import { urls } from '../../models/globalVariables.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

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
      url: urls.navigationSequence.infoPage.url,
    },
    {
      pageName: 'SELECT PLAN',
      stepName: 'STEP 2',
      number: '2',
      url: urls.navigationSequence.planPage.url,
    },
    {
      pageName: 'ADD-ONS',
      stepName: 'STEP 3',
      number: '3',
      url: urls.navigationSequence.addsPage.url,
    },
    {
      pageName: 'SUMMARY',
      stepName: 'STEP 4',
      number: '4',
      url: urls.navigationSequence.summaryPage.url,
    },
  ];

  constructor(private appService: ApplicationBackgroundService) {}

  get CurrentUrlSegment(): string {
    return this.appService.CurrentUrlSegment;
  }
}
