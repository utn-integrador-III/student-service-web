import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalAgregarZonaComponent } from '../modal-agregar-zona/modal-agregar-zona.component';
import { ZoneService } from '../zone.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
  zonas: any[] = [];
  zonasFiltradas: any[] = [];
  paginacion: any = {
    paginaActual: 1,
    zonasPorPagina: 5,
    totalZonas: 0,
    paginas: []
  };

  constructor(
    private dialog: MatDialog,
    private zoneService: ZoneService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarZonas();
  }

  cargarZonas(): void {
    this.zoneService.getZonas().subscribe((data: any[]) => {
      this.zonas = data;
      console.log("Datos extraidos de la DB", this.zonas);
      this.paginacion.totalZonas = this.zonas.length;
      this.calcularPaginas();
      this.cargarZonasPagina();
    });
  }

  abrirModal(opcion: number, zona?: any): void {
    const dialogRef = this.dialog.open(ModalAgregarZonaComponent, {
      width: '500px',
      autoFocus: true,
      data: {
        zona: opcion === 2 ? zona : null,
        isEdit: opcion === 2
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Datos recibidos del modal:', result);

        if (opcion === 1) {
          const nuevaZona = { name: result.nombre, location: result.localidad };

          this.zoneService.agregarZona(nuevaZona).subscribe({
            next: (response) => {
              console.log('Zona agregada:', response);

              this.snackBar.open('Zona creada correctamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });

              this.cargarZonas();
            },
            error: (error) => {
              console.error('Error al agregar zona:', error);
              if (error.error && error.error.message_code === 'ZONE_ALREADY_EXIST') {
                this.snackBar.open('La zona ya existe', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                });
              } else {
                this.snackBar.open('Error al agregar zona', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                });
              }
            }
          });
        } else if (opcion === 2 && zona) {
          const zonaActualizada = { _id: zona._id, name: result.nombre, location: result.localidad };

          this.zoneService.actualizarZona(zonaActualizada).subscribe(response => {
            console.log('Zona actualizada:', response);

            this.snackBar.open('Zona actualizada correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });

            this.cargarZonas();
          });
        }
      }
    });
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
      zona.name.toLowerCase().includes(busqueda) ||
      zona.location.toLowerCase().includes(busqueda)
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
    this.abrirModal(2, zona);
  }

  eliminarZona(zona: any): void {
    this.zoneService.eliminarZona(zona._id).subscribe(response => {
      console.log('Zona eliminada:', response);

      this.snackBar.open('Zona eliminada correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });

      this.cargarZonas();
    });
  }
}
