import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { IPage } from 'src/app/models/page.model';
import { Add, SubscriptionInfo } from 'src/app/models/subscriptionInfo.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-adds-page',
  templateUrl: './adds-page.component.html',
  styleUrls: ['./adds-page.component.sass'],
})
export class AddsPageComponent implements IPage {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  subscriptionInfo: SubscriptionInfo;

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    appService.CurrentPage = this;
    appService.CurrentPageIndex =
      urls.navigationSequence.addsPage.sequenceNumber;

    this.subscriptionInfo = this.appService.SubscriptionInfo;
  }

  validate(): boolean {
    // TODO: ....
    return true;
  }
  terminate(): void {
    this.terminated.next();
  }

  test(event: any) {
    event.preventDefault();
  }
}
