import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';
import {StatsComponent} from './stats/stats.component';
import {FlightsComponent} from './flights/flights.component';
import {FlightDetailsComponent} from "./flights/flight-details/flight-details.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'flights',
    component: FlightsComponent
  },
  {
    path: 'flights/:id',
    component: FlightDetailsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
