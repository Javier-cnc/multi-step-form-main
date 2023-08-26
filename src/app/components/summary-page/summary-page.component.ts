import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { SubscriptionInfo } from 'src/app/models/subscriptionInfo.model';
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

    // calculate the sum of adds prices
    var addPrices = this.subscriptionInfo.Adds.map((add) => {
      return this.subscriptionInfo.plan.isYearly
        ? add.pricePerYear
        : add.pricePerMonth;
    });

    var addTotalPrice = 0;
    addPrices.forEach((price) => {
      addTotalPrice += price;
    });

    // calculate the total price value
    if (this.subscriptionInfo.plan.isYearly) {
      this.totalValue = this.subscriptionInfo.plan.pricePerYear + addTotalPrice;
    } else {
      this.totalValue =
        this.subscriptionInfo.plan.pricePerMonth + addTotalPrice;
    }
  }
}
