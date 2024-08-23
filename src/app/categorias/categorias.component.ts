import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriasModalComponent } from '../categorias-modal/categorias-modal.component';
import { CategoriaServices } from '../Services/categoriasServices';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '../Services/toaster.service';
import { PermissionService } from '../Services/permission/permission.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {
  title = 'Categorias';
  displayedColumns: String[] = ['category_name', 'action'];
  dataSource: MatTableDataSource<any>;
  categorias: any[] = [];
  canWrite = false;
  canDelete = false;
  canUpdate = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _categoryServices: CategoriaServices,
    private toastService: ToastService,
    private permissionService: PermissionService
  ) {
    this.canWrite = this.permissionService.hasPermission(
      'write',
      '/categorias'
    );
    this.canDelete = this.permissionService.hasPermission(
      'delete',
      '/categorias'
    );
    this.canUpdate = this.permissionService.hasPermission(
      'update',
      '/categorias'
    );
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getCategoriaList();
  }

  OpenDialogEditCategorias() {
    const dialogRef = this._dialog.open(CategoriasModalComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategoriaList();
        }
      },
    });
  }

  getCategoriaList() {
    this._categoryServices.getAllCategories().subscribe(
      (response) => {
        if (response && response.data) {
          this.categorias = response.data;
          this.dataSource.data = this.categorias;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error(
            'The response is not in the expected format:',
            response
          );
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  eliminarCategoria(id: string): void {
    this._categoryServices.deleteCategoria(id).subscribe({
      next: (res) => {
        console.log('Categoria eliminada con éxito:', res);
        this.toastService.showSuccess('Categoria eliminada con exito');
        this.getCategoriaList();
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
        this.toastService.showError('Error al eliminar la categoría');
      },
    });
  }

  openEditForm(data: any) {
    this._dialog.open(CategoriasModalComponent, {
      data,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
