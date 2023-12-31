import { Injectable } from '@angular/core';
import { IPage } from '../models/page.model';
import { urls } from '../models/globalVariables.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionInfo } from '../models/subscriptionInfo.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationBackgroundService {
  // #region CurrentUrlSegment
  private currentUrlSegment: string = '';
  get CurrentUrlSegment(): string {
    return this.currentUrlSegment;
  }
  // #endregion

  // #region Subscription info
  // hold all the information the user enters to the application
  private subscriptionInfo: SubscriptionInfo;

  get SubscriptionInfo(): SubscriptionInfo {
    return this.subscriptionInfo;
  }
  // #endregion

  // #region CurrentPage property
  // reference to the current page component implementing IPage interface
  private currentPage: IPage | null = null;

  get CurrentPage(): IPage | null {
    return this.currentPage;
  }
  set CurrentPage(page: IPage | null) {
    this.currentPage = page;
  }
  // #endregion

  // #region CurrentPageIndex property
  // indicates the index of the current page in the navigation sequence of the application
  private currentPageIndex: number = 0;

  get CurrentPageIndex(): number {
    return this.currentPageIndex;
  }

  set CurrentPageIndex(pageIndex: number) {
    this.currentPageIndex = pageIndex;
    var navigationSequenceArray = Object.values(urls.navigationSequence);

    var page = navigationSequenceArray.find(
      (element) => element.sequenceNumber === pageIndex
    );
    if (page) {
      this.currentUrlSegment = page.url;
    }
  }
  // #endregion

  // returns true if the current page is the last page of navigation sequence
  // returns false otherwise
  get IsLastPage(): boolean {
    return (
      this.CurrentPageIndex === Object.keys(urls.navigationSequence).length - 1
    );
  }

  // returns true if the current page is the first in the navigation sequence
  // returns false otherwise
  get IsInitialPage(): boolean {
    return this.CurrentPageIndex === 0;
  }

  get IsSummaryPage(): boolean {
    return (
      this.CurrentPageIndex ===
      urls.navigationSequence.summaryPage.sequenceNumber
    );
  }

  get IsConfirmationPage(): boolean {
    return (
      this.currentPageIndex ===
      urls.navigationSequence.confirmationPage.sequenceNumber
    );
  }

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    // set initial values to subscription info
    this.subscriptionInfo = this.createNewSubscriptionInfo();
  }

  // try to navigate to the next corresponding page in the navigation sequence
  moveForward() {
    // check if the current page is valid
    if (this.CurrentPage?.validate()) {
      // page valid
      // hook to the event that informs the page has been terminated
      this.CurrentPage.Terminated.subscribe({
        next: () => {
          // navigate to the next page using the Routing System
          this.navigateToPage(this.CurrentPageIndex + 1);
        },
      });

      // call the page to execute all the termination process
      // like animations, store information, etc...
      this.CurrentPage.terminate();
    } else {
      // page invalid
      // do nothing, because in this case the page will show to the user
      // all the information it needs to fix the validation issues
    }
  }

  // try to navigate one step back in the navigation sequence
  moveBack() {
    if (this.IsInitialPage) {
      return;
    }
    // to move back I don't need to validate information so
    this.CurrentPage?.Terminated.subscribe({
      next: () => {
        // navigate one step back in the navigation sequence
        this.navigateToPage(this.currentPageIndex - 1);
      },
    });

    this.CurrentPage?.terminate();
  }

  // navigate to the page with defined index using the routing system
  private navigateToPage(index: number) {
    // gets an array of navigationSequence properies values to be able to apply a loop over them
    let array = Object.values(urls.navigationSequence);

    // get the url of the element which sequenceNumber match the index of the page to navigate to
    let url = array.find((element) => element.sequenceNumber === index)?.url;

    if (url) {
      // only tries to navigate if the url is defined
      // navigate to the url
      this.router.navigateByUrl(url);
    }
  }

  private createNewSubscriptionInfo(): SubscriptionInfo {
    // initialize subscription info
    let newSubscriptionInfo = new SubscriptionInfo();

    // feed adds collection
    newSubscriptionInfo.adds = [
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

    newSubscriptionInfo.plans = [
      {
        name: 'Arcade',
        pricePerMonth: 9,
        pricePerYear: 90,
        iconAddress: 'assets/images/icon-arcade.svg',
        freeMonthQuantity: 2,
        selected: false,
      },
      {
        name: 'Advanced',
        pricePerMonth: 12,
        pricePerYear: 120,
        iconAddress: 'assets/images/icon-advanced.svg',
        freeMonthQuantity: 2,
        selected: false,
      },
      {
        name: 'Pro',
        pricePerMonth: 15,
        pricePerYear: 150,
        iconAddress: 'assets/images/icon-pro.svg',
        freeMonthQuantity: 2,
        selected: false,
      },
    ];

    return newSubscriptionInfo;
  }
  navigateToPlanPage() {
    this.navigateToPage(urls.navigationSequence.planPage.sequenceNumber);
  }

  resetApplication() {
    // reset information object
    this.subscriptionInfo = this.createNewSubscriptionInfo();

    // navigate to the starting page of application
    this.navigateToPage(0);
  }
}
