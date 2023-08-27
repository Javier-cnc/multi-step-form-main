import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { IPage } from 'src/app/models/page.model';
import {
  SubscriptionInfo,
  SubscriptionPlan,
} from 'src/app/models/subscriptionInfo.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.sass'],
})
export class PlanPageComponent implements IPage {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  subscriptionInfo: SubscriptionInfo;

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    // notifies the rest of the application that this is the current page
    this.appService.CurrentPage = this;

    // notifies the rest of the appliation which one is the index in the navigation sequence of the current page
    this.appService.CurrentPageIndex =
      urls.navigationSequence.planPage.sequenceNumber;

    this.subscriptionInfo = appService.SubscriptionInfo;
  }

  terminate(): void {
    this.terminated.next();
  }

  validate(): boolean {
    return true;
  }

  setSelectedPlan(planIndex: number) {
    this.subscriptionInfo.plans.forEach((plan, index) => {
      plan.selected = index === planIndex;
    });
  }
}
