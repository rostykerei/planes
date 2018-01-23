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
      label: "Aircrafts",
      path: "aircrafts"
    },
    {
      label: "Airlines",
      path: "airlines"
    },
    {
      label: "Routes",
      path: "routes"
    },
    {
      label: "About",
      path: "about"
    }
  ];
}
