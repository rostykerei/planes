import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  buttons : any = [
    {
      label: "Dashboard",
      path: ""
    },
    {
      label: "Flight",
      path: "flights"
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
      label: "About",
      path: "about"
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  buttonClick(b: any) {
    this.router.navigate([b.path]);
  }
}
