import { Component } from '@angular/core';
import { IPage } from 'src/app/models/page.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';
import { EventEmitter } from '@angular/core';
import { urls } from '../../models/globalVariables.model';
import { BehaviorSubject, Observable, Observer, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.sass'],
})
export class InfoPageComponent implements IPage {
  //#region IPage interface implementation

  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  //#endregion

  validate(): boolean {
    // TODO: actions to implement:
    //    1- validate email
    //    2- validate phone number
    return true;
  }

  terminate(): void {
    // TODO: actions to implement:
    //    1- store data outside of the current component to avoid data lost
    //    2- set-up some transition animation
    //    3- when done, fired the 'termined' event (using next() method)
    this.terminated.next();
  }

  constructor(private appService: ApplicationBackgroundService) {
    // informs the rest of the application that this is the current page
    appService.CurrentPage = this;

    // informs the rest of the application the index of the current page
    appService.CurrentPageIndex =
      urls.navigationSequence.infoPage.sequenceNumber;
  }
}
