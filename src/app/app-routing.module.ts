import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPageComponent } from './components/info-page-component/info-page.component';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { AddsPageComponent } from './components/adds-page/adds-page.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoPageComponent },
  { path: 'plan', component: PlanPageComponent },
  { path: 'adds', component: AddsPageComponent },
  { path: 'summary', component: SummaryPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
