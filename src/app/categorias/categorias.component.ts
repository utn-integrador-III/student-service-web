import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriasModalComponent } from '../categorias-modal/categorias-modal.component';
import { CategoriaServices } from '../Services/categoriasServices';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  title = 'Categorias'
  displayedColumns: String[] = ['category_name', 'action'];
  dataSource: MatTableDataSource<any>;
  categorias: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dialog: MatDialog, private _categoryServices: CategoriaServices) { }

  ngOnInit(): void {
    this.getCategoriaList()
  }

  OpenDialogEditCategorias() {
   const dialogRef = this._dialog.open(CategoriasModalComponent);
   dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if(val){
        this.getCategoriaList()
      }
    }
   })
  }

  getCategoriaList() {
    this._categoryServices.getAllCategories().subscribe(
      response => {
        if (response && response.data) {
          this._categoryServices = response.data;
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        } else {
          console.error('The response is not in the expected format:', response);
        }
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  eliminarCategoria(id: string): void {
    this._categoryServices.deleteCategoria(id).subscribe({
      next: (res) => {
        console.log('Categoria eliminada con éxito:', res);
        this.getCategoriaList();
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
      }
    });
  }

  openEditForm(data: any){
    this._dialog.open(CategoriasModalComponent,{
      data,
    })
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

