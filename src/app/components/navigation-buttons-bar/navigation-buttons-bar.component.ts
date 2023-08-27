import { Component } from '@angular/core';
import { urls } from '../../models/globalVariables.model';
import { ApplicationBackgroundService } from 'src/app/services/application-background.service';

@Component({
  selector: 'app-navigation-buttons-bar',
  templateUrl: './navigation-buttons-bar.component.html',
  styleUrls: ['./navigation-buttons-bar.component.sass'],
})
export class NavigationButtonsBarComponent {
  constructor(private appService: ApplicationBackgroundService) {}

  moveForward() {
    this.appService.moveForward();
  }

  moveBack() {
    this.appService.moveBack();
  }

  get IsLastPage(): boolean {
    return this.appService.IsLastPage;
  }

  get IsInitialPage(): boolean {
    return this.appService.IsInitialPage;
  }

  get IsSummaryPage(): boolean {
    return this.appService.IsSummaryPage;
  }
}
