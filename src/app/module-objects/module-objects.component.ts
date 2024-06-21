import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-module-objects',
  templateUrl: './module-objects.component.html',
  styleUrls: ['./module-objects.component.css']
})
export class ModuleObjectsComponent implements OnInit {

  menuVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Código de inicialización si es necesario
  }

  toggleMenuVisibility() {
    this.menuVisible = !this.menuVisible;
    console.log('Menu visible:', this.menuVisible);
  }
  

}
