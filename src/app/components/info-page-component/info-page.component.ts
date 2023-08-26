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
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  // hold the name inserted by the user
  name: string = '';
  invalidName: boolean = false;

  // hold the email inserted by the user
  email: string = '';
  invalidEmail: boolean = false;

  // hold the phone number inserted by the user
  phoneNumber: string = '';
  invalidPhoneNumber: boolean = false;

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    // informs the rest of the application that this is the current page
    appService.CurrentPage = this;

    // informs the rest of the application the index of the current page
    appService.CurrentPageIndex =
      urls.navigationSequence.infoPage.sequenceNumber;

    // get initial information
    this.name = this.appService.SubscriptionInfo.name;
    this.email = this.appService.SubscriptionInfo.email;
    this.phoneNumber = this.appService.SubscriptionInfo.phoneNumber;
  }

  // returns false if the validation process was NOT successfull
  // and true otherwise
  validate(): boolean {
    // used to determine if there is some invalid value in the
    // following validation operations
    var isErrorStatus = false;

    // #region Validate name
    if (this.name === '') {
      // the name is required
      this.invalidName = true;
      console.log('the name is invalid');
      isErrorStatus = true;
    }
    // #endregion

    // #region Validate email

    if (
      !this.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      // invalid email
      this.invalidEmail = true;
      console.log('the email is invalid');
      isErrorStatus = true;
    }
    // #endregion

    // #region Validate phone number
    if (
      !this.phoneNumber.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    ) {
      this.invalidPhoneNumber = true;
      console.log('the phone is invalid');
      isErrorStatus = true;
    }
    // #endregion

    // if there is some error in the validation process the functions
    // returns false,
    return !isErrorStatus;
  }

  terminate(): void {
    // save information
    this.appService.SubscriptionInfo.name = this.name;
    this.appService.SubscriptionInfo.email = this.email;
    this.appService.SubscriptionInfo.phoneNumber = this.phoneNumber;

    this.terminated.next();
  }

  clearNameStatus() {
    this.invalidName = false;
  }
  clearEmailStatus() {
    this.invalidEmail = false;
  }
  clearPhoneNumberStatus() {
    this.invalidPhoneNumber = false;
  }
}
