import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AboutComponent} from "./about/about.component";
import {FlightsComponent} from "./flights/flights.component";
import {AircraftsComponent} from "./aircrafts/aircrafts.component";
import {AirlinesComponent} from "./airlines/airlines.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'flights',
    component: FlightsComponent
  },
  {
    path: 'aircrafts',
    component: AircraftsComponent
  },
  {
    path: 'airlines',
    component: AirlinesComponent
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
export class AppRoutingModule { }
