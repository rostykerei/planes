import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {FlightsComponent} from './flights/flights.component';
import {AircraftsComponent} from './aircrafts/aircrafts.component';
import {AirlinesComponent} from './airlines/airlines.component';
import {AboutComponent} from './about/about.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MapService} from "./map.service";
import {HttpClientModule} from "@angular/common/http";
import {DashboardDetailsComponent} from './dashboard-details/dashboard-details.component';
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import * as SockJS from 'sockjs-client';
import {environment} from "../environments/environment";
import {RoutesComponent} from './routes/routes.component';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';

const stompConfig: StompConfig = {
  url: () => new SockJS(environment.apiUrl + '/ws'),
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: false
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FlightsComponent,
    AircraftsComponent,
    AirlinesComponent,
    AboutComponent,
    NavigationComponent,
    DashboardDetailsComponent,
    RoutesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    Ng2GoogleChartsModule
  ],
  providers: [MapService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
