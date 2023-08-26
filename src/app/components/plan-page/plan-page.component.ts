import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { IPage } from 'src/app/models/page.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.sass'],
})
export class PlanPageComponent implements IPage {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  isYearly: boolean = false;

  selectedPlan: string = '';

  options: {
    name: string;
    price: number;
    iconAddress: string;
    freeMonthQuantity: number;
  }[] = [
    {
      name: 'Arcade',
      price: 9,
      iconAddress: 'assets/images/icon-arcade.svg',
      freeMonthQuantity: 2,
    },
    {
      name: 'Advanced',
      price: 12,
      iconAddress: 'assets/images/icon-advanced.svg',
      freeMonthQuantity: 2,
    },
    {
      name: 'Pro',
      price: 15,
      iconAddress: 'assets/images/icon-pro.svg',
      freeMonthQuantity: 2,
    },
  ];

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    // notifies the rest of the application that this is the current page
    this.appService.CurrentPage = this;

    // notifies the rest of the appliation which one is the index in the navigation sequence of the current page
    this.appService.CurrentPageIndex =
      urls.navigationSequence.planPage.sequenceNumber;

    // get the selected plan from 'appService' data, if it is empty set a default value
    this.selectedPlan =
      this.appService.SubscriptionInfo.plan === ''
        ? this.options[0].name
        : this.appService.SubscriptionInfo.plan;

    this.isYearly = this.appService.SubscriptionInfo.IsYearly;
  }

  terminate(): void {
    // save information
    this.appService.SubscriptionInfo.plan = this.selectedPlan;
    this.appService.SubscriptionInfo.IsYearly = this.isYearly;

    this.terminated.next();
  }

  validate(): boolean {
    return true;
  }
}
