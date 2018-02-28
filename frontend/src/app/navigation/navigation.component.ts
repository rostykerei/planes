import {Component} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  buttons: any = [
    {
      label: 'Dashboard',
      icon: 'my_location',
      path: ''
    },
    {
      label: 'Statistics',
      icon: 'show_chart',
      path: 'stats'
    },
    {
      label: 'Flights',
      icon: 'flight_takeoff',
      path: 'flights'
    },
    {
      label: 'About',
      icon: 'info_outline',
      path: 'about'
    }
  ];
}
