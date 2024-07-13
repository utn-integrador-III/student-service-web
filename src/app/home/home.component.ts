import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}