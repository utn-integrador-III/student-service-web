import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgregarZonaComponent } from '../modal-agregar-zona/modal-agregar-zona.component';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {
  modalRef: NgbModalRef | null = null;
  zonas: any[] = [
    { nombre: 'Zona 1', localidad: 'Localidad 1' },
    { nombre: 'Zona 2', localidad: 'Localidad 2' },
    { nombre: 'Zona 3', localidad: 'Localidad 3' },
    { nombre: 'Zona 4', localidad: 'Localidad 4' },
    { nombre: 'Zona 5', localidad: 'Localidad 5' },
    { nombre: 'Zona 6', localidad: 'Localidad 6' },
    { nombre: 'Zona 7', localidad: 'Localidad 7' },
    { nombre: 'Zona 8', localidad: 'Localidad 8' },
    { nombre: 'Zona 9', localidad: 'Localidad 9' },
    { nombre: 'Zona 10', localidad: 'Localidad 10' },
    { nombre: 'Zona 11', localidad: 'Localidad 11' },
    { nombre: 'Zona 12', localidad: 'Localidad 12' },
    { nombre: 'Zona 13', localidad: 'Localidad 13' },
    { nombre: 'Zona 14', localidad: 'Localidad 14' },
    { nombre: 'Zona 15', localidad: 'Localidad 15' }
  ];
  zonasFiltradas: any[];
  paginacion: any = {
    paginaActual: 1,
    zonasPorPagina: 5,
    totalZonas: 0,
    paginas: []
  };

  constructor(private modalService: NgbModal) {
    this.paginacion.totalZonas = this.zonas.length;
    this.calcularPaginas();
    this.mostrarZonasPagina(this.paginacion.paginaActual);
  }

  abrirModal(opcion: number): void {
    if (opcion === 1) {
      this.modalRef = this.modalService.open(ModalAgregarZonaComponent, { centered: true });

      // Manejar eventos de la modal, por ejemplo:
      this.modalRef.componentInstance.zonaGuardada.subscribe((mensaje: string) => {
        console.log(mensaje); // Aquí puedes manejar el mensaje de confirmación
        // Realizar acciones adicionales si es necesario
      });
    } else {
      if (this.modalRef) {
        this.modalRef.dismiss();
        this.modalRef = null;
      }
    }
  }

  filtrarZonas(event: Event): void {
    const busqueda = (event.target as HTMLInputElement).value.toLowerCase().trim();

    if (!busqueda) {
      this.zonasFiltradas = this.zonas.slice(0, this.paginacion.zonasPorPagina); // Mostrar las primeras 5 zonas si la búsqueda está vacía
      this.paginacion.totalZonas = this.zonas.length;
      this.paginacion.paginaActual = 1;
      this.calcularPaginas();
      return;
    }

    this.zonasFiltradas = this.zonas.filter(zona =>
      zona.nombre.toLowerCase().includes(busqueda) ||
      zona.localidad.toLowerCase().includes(busqueda)
    );
    this.paginacion.totalZonas = this.zonasFiltradas.length;
    this.paginacion.paginaActual = 1;
    this.calcularPaginas();
    this.mostrarZonasPagina(1);
  }

  mostrarZonasPagina(pagina: number): void {
    const inicio = (pagina - 1) * this.paginacion.zonasPorPagina;
    const fin = inicio + this.paginacion.zonasPorPagina;
    this.zonasFiltradas = this.zonasFiltradas.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.paginacion.paginas.length) {
      return;
    }
    this.paginacion.paginaActual = pagina;
    this.mostrarZonasPagina(pagina);
  }

  calcularPaginas(): void {
    this.paginacion.paginas = [];
    const numPaginas = Math.ceil(this.paginacion.totalZonas / this.paginacion.zonasPorPagina);
    for (let i = 1; i <= numPaginas; i++) {
      this.paginacion.paginas.push(i);
    }
  }
}
