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

  // define the available options for the adds to be selected
  options: {
    name: string;
    selected: boolean;
    nameText: string;
    description: string;
    pricePerMonth: number;
    pricePerYear: number;
  }[] = [
    {
      name: 'onlineService',
      selected: false,
      nameText: 'Online service',
      description: 'Access to multiplayer games',
      pricePerMonth: 1,
      pricePerYear: 10,
    },
    {
      name: 'largerStorage',
      selected: false,
      nameText: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      pricePerMonth: 2,
      pricePerYear: 20,
    },
    {
      name: 'customizableProfile',
      selected: false,
      nameText: 'Customizable profile',
      description: 'Custom theme on your profile',
      pricePerMonth: 2,
      pricePerYear: 20,
    },
  ];

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    appService.CurrentPage = this;
    appService.CurrentPageIndex =
      urls.navigationSequence.addsPage.sequenceNumber;

    // get initial values
    this.options.forEach((option) => {
      // get a map with only the name values of the selected adds
      var selectedNames = appService.SubscriptionInfo.Adds.map(
        (add) => add.name
      );

      if (selectedNames.includes(option.name)) {
        // if the option name is in the Adds array of Subscription info, then is a selected option
        option.selected = true;
      }
    });

    this.subscriptionInfo = this.appService.SubscriptionInfo;
  }

  validate(): boolean {
    // TODO: ....
    return true;
  }
  terminate(): void {
    // save information
    // get only selected options
    var selectedOptions = this.options.filter((element) => element.selected);

    // extract just name and price information of the selected adds options
    // and save those values
    var adds = selectedOptions.map((element) => {
      let objectToReturn: Add = new Add();
      objectToReturn.name = element.name;
      objectToReturn.pricePerYear = element.pricePerYear;
      objectToReturn.pricePerMonth = element.pricePerMonth;

      return objectToReturn;
    });

    this.appService.SubscriptionInfo.Adds = adds;

    this.terminated.next();
  }

  test(event: any) {
    event.preventDefault();
  }
}
