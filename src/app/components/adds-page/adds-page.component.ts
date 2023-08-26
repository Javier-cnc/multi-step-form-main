import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from 'src/app/models/globalVariables.model';
import { IPage } from 'src/app/models/page.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-adds-page',
  templateUrl: './adds-page.component.html',
  styleUrls: ['./adds-page.component.sass'],
})
export class AddsPageComponent implements IPage {
  private terminated: ReplaySubject<void> = new ReplaySubject<void>();

  // define the available options for the adds to be selected
  options: {
    name: string;
    selected: boolean;
    nameText: string;
    description: string;
    price: number;
  }[] = [
    {
      name: 'onlineService',
      selected: false,
      nameText: 'Online service',
      description: 'Access to multiplayer games',
      price: 1,
    },
    {
      name: 'largerStorage',
      selected: false,
      nameText: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      price: 2,
    },
    {
      name: 'customizableProfile',
      selected: false,
      nameText: 'Customizable profile',
      description: 'Custom theme on your profile',
      price: 2,
    },
  ];

  get Terminated(): Observable<void> {
    return this.terminated;
  }

  constructor(private appService: ApplicationBackgroundService) {
    appService.CurrentPage = this;
    appService.CurrentPageIndex =
      urls.navigationSequence.addsPage.sequenceNumber;
  }

  validate(): boolean {
    // TODO: ....
    return true;
  }
  terminate(): void {
    // TODO: ...
    this.terminated.next();
  }

  test(event: any) {
    event.preventDefault();
  }
}
