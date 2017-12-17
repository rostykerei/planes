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
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import * as SockJS from 'sockjs-client';

const stompConfig: StompConfig = {
  // Which server?
  url: () => new SockJS('http://localhost:8080/ws'),

  // Headers
  // Typical keys: login, passcode, host
  headers: {},

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
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
    DashboardDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
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
