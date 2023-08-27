import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPageComponent } from './components/info-page-component/info-page.component';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { AddsPageComponent } from './components/adds-page/adds-page.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { urls } from './models/globalVariables.model';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';

// create shortcut to access navigation sequence urls
const navSeq = urls.navigationSequence;

const routes: Routes = [
  { path: '', redirectTo: navSeq.infoPage.url, pathMatch: 'full' },
  { path: navSeq.infoPage.url, component: InfoPageComponent },
  { path: navSeq.planPage.url, component: PlanPageComponent },
  { path: navSeq.addsPage.url, component: AddsPageComponent },
  { path: navSeq.summaryPage.url, component: SummaryPageComponent },
  { path: navSeq.confirmationPage.url, component: ConfirmationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
