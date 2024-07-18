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

  selectOption(option: string) {
    console.log(`Opción seleccionada: ${option}`);
    switch (option) {
      case 'zonas':
        console.log('Seleccionaste Zonas');
        break;
      case 'categoria':
        console.log('Seleccionaste Categoría');
        break;
      case 'bitacoraProfesor':
        console.log('Seleccionaste Bitácora Profesor');
        break;
      case 'bitacoraEstudiante':
        console.log('Seleccionaste Bitácora Estudiante');
        break;
      default:
        console.log('Opción no válida');
        break;
    }
    this.showBitacoraOptions = false; 
    this.showAjustesOptions = false; 
  }
}
