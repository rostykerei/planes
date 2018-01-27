import {Component} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  buttons : any = [
    {
      label: "Dashboard",
      path: ""
    },
    {
      label: "Statistics",
      path: "stats"
    },
    {
      label: "Flights",
      path: "flights"
    },
    {
      label: "About",
      path: "about"
    }
  ];
}
