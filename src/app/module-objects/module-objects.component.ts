import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-objects',
  templateUrl: './module-objects.component.html',
  styleUrls: ['./module-objects.component.css']
})
export class ModuleObjectsComponent implements OnInit {

  menuVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenuVisibility() {
    this.menuVisible = !this.menuVisible;
    console.log('Menu visible:', this.menuVisible);
  }
}
