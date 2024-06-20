import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarZonaComponent } from '../modal-agregar-zona/modal-agregar-zona.component';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {
  zonas: any[] = [
    { nombre: 'Zona 01', localidad: 'Localidad 01' },
    { nombre: 'Zona 02', localidad: 'Localidad 02' },
    { nombre: 'Zona 03', localidad: 'Localidad 03' },
    { nombre: 'Zona 04', localidad: 'Localidad 04' },
    { nombre: 'Zona 05', localidad: 'Localidad 05' },
    { nombre: 'Zona 06', localidad: 'Localidad 06' },
    { nombre: 'Zona 07', localidad: 'Localidad 07' },
    { nombre: 'Zona 08', localidad: 'Localidad 08' },
    { nombre: 'Zona 09', localidad: 'Localidad 09' },
    { nombre: 'Zona 10', localidad: 'Localidad 10' },
    { nombre: 'Zona 11', localidad: 'Localidad 11' },
    { nombre: 'Zona 12', localidad: 'Localidad 12' },
    { nombre: 'Zona 13', localidad: 'Localidad 13' },
    { nombre: 'Zona 14', localidad: 'Localidad 14' },
    { nombre: 'Zona 15', localidad: 'Localidad 15' },
    { nombre: 'Zona 16', localidad: 'Localidad 16' },
    { nombre: 'Zona 17', localidad: 'Localidad 17' },
    { nombre: 'Zona 18', localidad: 'Localidad 18' },
    { nombre: 'Zona 19', localidad: 'Localidad 19' },
    { nombre: 'Zona 20', localidad: 'Localidad 20' },
    { nombre: 'Zona 21', localidad: 'Localidad 21' },
    { nombre: 'Zona 22', localidad: 'Localidad 22' },
    { nombre: 'Zona 23', localidad: 'Localidad 23' },
    { nombre: 'Zona 24', localidad: 'Localidad 24' },
    { nombre: 'Zona 25', localidad: 'Localidad 25' },
    { nombre: 'Zona 26', localidad: 'Localidad 26' },
    { nombre: 'Zona 27', localidad: 'Localidad 27' },
    { nombre: 'Zona 28', localidad: 'Localidad 28' },
    { nombre: 'Zona 29', localidad: 'Localidad 29' },
    { nombre: 'Zona 30', localidad: 'Localidad 30' }
  ];
  zonasFiltradas: any[] = [];
  paginacion: any = {
    paginaActual: 1,
    zonasPorPagina: 5,
    totalZonas: 0,
    paginas: []
  };

  constructor(private dialog: MatDialog) {
    this.paginacion.totalZonas = this.zonas.length;
    this.calcularPaginas();
    this.cargarZonasPagina();
  }

  abrirModal(opcion: number): void {
    if (opcion === 1) {
      const dialogRef = this.dialog.open(ModalAgregarZonaComponent, {
        width: '500px',
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          console.log(result); // Aquí puedes manejar el resultado del modal
          // Realizar acciones adicionales si es necesario
        }
      });
    }
  }

  filtrarZonas(event: Event): void {
    const busqueda = (event.target as HTMLInputElement).value.toLowerCase().trim();

    if (!busqueda) {
      this.zonasFiltradas = this.zonas.slice(0, this.paginacion.zonasPorPagina);
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
  }

  cambiarPagina(pagina: number): void {
    this.paginacion.paginaActual = pagina;
    this.cargarZonasPagina();
  }

  private calcularPaginas(): void {
    this.paginacion.paginas = [];
    const totalPaginas = Math.ceil(this.paginacion.totalZonas / this.paginacion.zonasPorPagina);
    for (let i = 1; i <= totalPaginas; i++) {
      this.paginacion.paginas.push(i);
    }
  }

  private cargarZonasPagina(): void {
    const inicio = (this.paginacion.paginaActual - 1) * this.paginacion.zonasPorPagina;
    this.zonasFiltradas = this.zonas.slice(inicio, inicio + this.paginacion.zonasPorPagina);
  }

  editarZona(zona: any): void {
    // Lógica para editar una zona
    console.log('Editar:', zona);
  }

  eliminarZona(zona: any): void {
    // Lógica para eliminar una zona
    console.log('Eliminar:', zona);
  }
}
