import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AboutComponent} from "./about/about.component";
import {AircraftsComponent} from "./aircrafts/aircrafts.component";
import {AirlinesComponent} from "./airlines/airlines.component";
import {RoutesComponent} from "./routes/routes.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
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
    path: 'routes',
    component: RoutesComponent
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
