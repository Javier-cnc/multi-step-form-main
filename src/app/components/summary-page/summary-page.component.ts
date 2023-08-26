import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.sass'],
})
export class SummaryPageComponent {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  validate(): boolean {
    // TODO: ....
    return true;
  }
  terminate(): void {
    // TODO: ...
    this.terminated.next();
  }
  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    appService.CurrentPage = this;
    appService.CurrentPageIndex =
      urls.navigationSequence.summaryPage.sequenceNumber;
  }
}
