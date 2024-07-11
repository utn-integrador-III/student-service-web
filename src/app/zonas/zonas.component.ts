import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAgregarZonaComponent } from '../modal-agregar-zona/modal-agregar-zona.component';
import { ZoneService } from '../services/service-zone/zone.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../services/toaster.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css'],
})
export class ZonasComponent implements OnInit {
  zonas: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'location', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private zoneService: ZoneService,
    private snackBar: MatSnackBar,
    private toasterService: ToastService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.cargarZonas();
  }

  cargarZonas(): void {
    this.zoneService.getZonas().subscribe((data: any[]) => {
      this.zonas = data;
      this.dataSource.data = this.zonas;
      this.dataSource.paginator = this.paginator;
    });
  }
  abrirModal(opcion: number, zona?: any): void {
    const dialogRef = this.dialog.open(ModalAgregarZonaComponent, {
      width: '500px',
      autoFocus: true,
      data: {
        zona: opcion === 2 ? zona : null,
        isEdit: opcion === 2,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (opcion === 1) {
          const nuevaZona = { name: result.nombre, location: result.localidad };

          this.zoneService.agregarZona(nuevaZona).subscribe({
            next: (response) => {
              this.toasterService.showSuccess(
                'Zona creada correctamente',
                'Éxito'
              );
              this.cargarZonas();
            },
            error: (error) => {
              if (
                error.error &&
                error.error.message_code === 'ZONE_ALREADY_EXIST'
              ) {
                this.snackBar.open('La zona ya existe', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                });
              } else {
                this.toasterService.showError(
                  'Error al agregar zona',
                  '400 Bad Request'
                );
              }
            },
          });
        } else if (opcion === 2 && zona) {
          const zonaActualizada = {
            _id: zona._id,
            name: result.nombre,
            location: result.localidad,
          };

          this.zoneService
            .actualizarZona(zonaActualizada)
            .subscribe((response) => {
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
    const busqueda = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();
    this.dataSource.filter = busqueda;
  }
  editarZona(zona: any): void {
    this.abrirModal(2, zona);
  }

  eliminarZona(zona: any): void {
    this.zoneService.eliminarZona(zona._id).subscribe((response) => {
      this.snackBar.open('Zona eliminada correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });

      this.cargarZonas();
    });
  }
}
