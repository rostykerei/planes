import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FlightsComponent} from './flights/flights.component';
import {AboutComponent} from './about/about.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MapService} from './map.service';
import {HttpClientModule} from '@angular/common/http';
import {DashboardDetailsComponent} from './dashboard/dashboard-details/dashboard-details.component';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../environments/environment';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {StatsComponent} from './stats/stats.component';
import {StatsService} from './stats/stats.service';
import {FilterComponent} from './filter/filter.component';
import {MatInputModule} from '@angular/material';
import {AutocompleteService} from './autocomplete.service';
import {AutocompleteAircraftsComponent} from './filter/autocomplete/autocomplete-aircrafts.component';
import {AutocompleteAirportsComponent} from './filter/autocomplete/autocomplete-airports.component';
import {AutocompleteAirlinesComponent} from './filter/autocomplete/autocomplete-airlines.component';
import {AutocompleteTypesComponent} from './filter/autocomplete/autocomplete-types.component';
import {AutocompleteRoutesComponent} from './filter/autocomplete/autocomplete-routes.component';
import {DatepickerComponent} from './filter/datepicker/datepicker.component';
import {FlightDetailsComponent} from './flights/flight-details/flight-details.component';
import {FlightsService} from "./flights/flights.service";

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
    AboutComponent,
    NavigationComponent,
    DashboardDetailsComponent,
    StatsComponent,
    FilterComponent,
    AutocompleteAircraftsComponent,
    AutocompleteAirportsComponent,
    AutocompleteAirlinesComponent,
    AutocompleteTypesComponent,
    AutocompleteRoutesComponent,
    DatepickerComponent,
    FlightDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    Ng2GoogleChartsModule
  ],
  providers: [MapService,
    StatsService,
    FlightsService,
    AutocompleteService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
