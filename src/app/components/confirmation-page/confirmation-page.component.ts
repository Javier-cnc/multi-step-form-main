import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { IPage } from 'src/app/models/page.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.sass'],
})
export class ConfirmationPageComponent implements IPage {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  validate(): boolean {
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
      urls.navigationSequence.confirmationPage.sequenceNumber;
  }

  resetPage() {
    this.appService.resetApplication();
  }
}
