import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { IPage } from 'src/app/models/page.model';
import { SubscriptionPlan } from 'src/app/models/subscriptionInfo.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.sass'],
})
export class PlanPageComponent implements IPage {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  selectedPlan: SubscriptionPlan;

  options: {
    name: string;
    pricePerMonth: number;
    pricePerYear: number;
    iconAddress: string;
    freeMonthQuantity: number;
  }[] = [
    {
      name: 'Arcade',
      pricePerMonth: 9,
      pricePerYear: 90,
      iconAddress: 'assets/images/icon-arcade.svg',
      freeMonthQuantity: 2,
    },
    {
      name: 'Advanced',
      pricePerMonth: 12,
      pricePerYear: 120,
      iconAddress: 'assets/images/icon-advanced.svg',
      freeMonthQuantity: 2,
    },
    {
      name: 'Pro',
      pricePerMonth: 15,
      pricePerYear: 150,
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
    // create default value
    var defaultValue: any = {};
    defaultValue.name = this.options[0].name;
    defaultValue.pricePerMonth = this.options[0].pricePerMonth;
    defaultValue.pricePerYear = this.options[0].pricePerYear;
    defaultValue.isYearly = false;

    this.selectedPlan = this.appService.SubscriptionInfo.plan
      ? this.appService.SubscriptionInfo.plan
      : defaultValue;
  }

  terminate(): void {
    // save information
    this.appService.SubscriptionInfo.plan = this.selectedPlan;

    this.terminated.next();
  }

  validate(): boolean {
    return true;
  }

  setSelectedPlan(plan: any) {
    this.selectedPlan.name = plan.name;
    this.selectedPlan.pricePerYear = plan.pricePerYear;
    this.selectedPlan.pricePerMonth = plan.pricePerMonth;
  }
}
