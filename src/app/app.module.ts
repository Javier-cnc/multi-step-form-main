import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoPageComponent } from './components/info-page-component/info-page.component';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { AddsPageComponent } from './components/adds-page/adds-page.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    InfoPageComponent,
    PlanPageComponent,
    AddsPageComponent,
    SummaryPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
