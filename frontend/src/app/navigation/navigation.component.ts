import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  buttons : any = [
    {
      name: "Dashboard",
      path: "/"
    },
    {
      name: "Flight",
      path: "/flights"
    },
    {
      name: "Aircrafts",
      path: "/aircrafts"
    },
    {
      name: "Airlines",
      path: "/airlines"
    },
    {
      name: "About",
      path: "/about"
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  buttonClick(b: any) {
    this.router.navigate([b.path]);
  }
}
