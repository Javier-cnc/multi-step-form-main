import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import {
  Add,
  SubscriptionInfo,
  SubscriptionPlan,
} from 'src/app/models/subscriptionInfo.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.sass'],
})
export class SummaryPageComponent {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  public subscriptionInfo: SubscriptionInfo;
  public totalValue: number = 0;

  validate(): boolean {
    // in this page nothing requires validation
    return true;
  }
  terminate(): void {
    this.terminated.next();
  }
  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    appService.CurrentPage = this;
    appService.CurrentPageIndex =
      urls.navigationSequence.summaryPage.sequenceNumber;

    this.subscriptionInfo = this.appService.SubscriptionInfo;

    // filter only the selected adds
    var selectedAdds = this.SelectedAdds;

    // calculate the sum of adds prices
    var addPrices = selectedAdds.map((add) => {
      return this.subscriptionInfo.isYearly
        ? add.pricePerYear
        : add.pricePerMonth;
    });

    var addTotalPrice = 0;
    addPrices.forEach((price) => {
      addTotalPrice += price;
    });

    if (this.SelectedPlan == undefined) {
      return;
    }

    // calculate the total price value
    if (this.subscriptionInfo.isYearly) {
      this.totalValue = this.SelectedPlan.pricePerYear + addTotalPrice;
    } else {
      this.totalValue = this.SelectedPlan.pricePerMonth + addTotalPrice;
    }
  }

  // return the selected plan element
  get SelectedPlan(): SubscriptionPlan | undefined {
    return this.subscriptionInfo.plans.find((plan) => plan.selected);
  }

  get SelectedAdds(): Add[] {
    return this.subscriptionInfo.adds.filter((add) => add.selected);
  }
}
