import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaServices } from '../../../Services/categoriasServices';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.css'],
})
export class ShowDialogComponent implements OnInit {
  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any,
    private srvCategorias: CategoriaServices,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.srvCategorias.getAllCategories().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.categories = response.data;

          if (this.element.category && Array.isArray(this.element.category)) {
            this.element.category = this.element.category.map(
              (categoryItem: any) => {
                // Buscando la categoría por name en lugar de por ID
                const categoryName = categoryItem.category_name;

                const fullCategory = this.categories.find(
                  (c) => c.category_name === categoryName
                );

                return fullCategory || { category_name: 'Desconocido' };
              }
            );
          } else {
            this.element.category = [];
          }
        } else {
          this.toastr.error('Datos no válidos recibidos para las categorías.');
        }
      },
      () => {
        this.toastr.error('Error al cargar las categorías.');
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.dialogRef.close({ action: 'edit', data: this.element });
  }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete', data: this.element });
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return 'No disponible';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
