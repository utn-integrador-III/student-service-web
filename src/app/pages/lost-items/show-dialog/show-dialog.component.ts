import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaServices } from '../../../Services/categoriasServices';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { IAuth } from '../../../login/models/login.model';

@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.css'],
})
export class ShowDialogComponent implements OnInit {
  categories: any[] = [];
  isAuthenticated: boolean = false;
  isOwner: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any,
    private srvCategorias: CategoriaServices,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.checkAuthentication();
  }

  loadCategories() {
    this.srvCategorias.getAllCategories().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.categories = response.data;

          if (this.element.category && Array.isArray(this.element.category)) {
            this.element.category = this.element.category.map(
              (categoryItem: any) => {
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

  checkAuthentication() {
    this.store.select('auth').subscribe((authState) => {
      const currentUser: IAuth = authState.auth;
      this.isAuthenticated = !!currentUser;

      if (this.isAuthenticated) {
        this.isOwner = this.element.user_email === currentUser.email;
        this.canEdit = this.isOwner && this.element.status === 'Pending';
        this.canDelete = this.isOwner && this.element.status === 'Pending';
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
    location.reload();
  }

  onEdit(): void {
    if (this.canEdit) {
      this.dialogRef.close({ action: 'edit', data: this.element });
    } else {
      this.toastr.error('No tienes permiso para modificar este objeto.');
    }
  }

  onDelete(): void {
    if (this.canDelete) {
      this.dialogRef.close({ action: 'delete', data: this.element });
    } else {
      this.toastr.error('No tienes permiso para eliminar este objeto.');
    }
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return 'No disponible';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
