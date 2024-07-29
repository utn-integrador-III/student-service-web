import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showBitacoraOptions = false;
  showAjustesOptions = false;

  toggleBitacoraOptions() {
    this.showBitacoraOptions = !this.showBitacoraOptions;
    this.showAjustesOptions = false;
  }

  toggleAjustesOptions() {
    this.showAjustesOptions = !this.showAjustesOptions;
    this.showBitacoraOptions = false;
  }
}
