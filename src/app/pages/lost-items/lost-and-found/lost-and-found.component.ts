import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LostAndFoundService } from '../../../Services/service-LostAndFound/LostAndFound.service';
import { LostItemsComponent } from '../lost-items.component';
import { CategoriaServices } from '../../../Services/categoriasServices';
import { ShowDialogComponent } from '../show-dialog/show-dialog.component';

@Component({
  selector: 'app-lost-and-found',
  templateUrl: './lost-and-found.component.html',
  styleUrls: ['./lost-and-found.component.css'],
})
export class LostAndFoundComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[] = ['image', 'name', 'description', 'category'];
  @ViewChild('addModal') addModal!: ElementRef;
  selectedCategories: { [key: string]: boolean } = {};

  newObject: any = {
    category: [],
    name: '',
    description: '',
    user_email: '',
    safekeeper: [],
  };

  categories: any[] = [];
  imagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    private srvlostObjects: LostAndFoundService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private srvCategorias: CategoriaServices
  ) {}

  ngOnInit(): void {
    this.loadObjects();
    this.loadCategories();
  }

  loadObjects() {
    this.srvlostObjects.getObjects().subscribe(
      (response: any) => {
        this.dataSource.data = response.data;
      },
      (error) => {
        if (error.status === 404) {
          this.toastr.error('No hay objetos registrados.');
        } else {
          this.toastr.error('Error al cargar los objetos.');
        }
        console.log(error);
      }
    );
  }

  loadCategories() {
    this.srvCategorias.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
        this.categories.forEach((category) => {
          this.selectedCategories[category.category_name] = false;
        });
      },
      (error) => {
        if (error.status === 404) {
          this.toastr.error('No se encontraron categorías.');
        } else {
          this.toastr.error('Error al cargar las categorías.');
        }
        console.log(error);
      }
    );
  }

  onCategoryChange() {
    this.newObject.category = this.getSelectedCategories();
  }

  getSelectedCategories(): string[] {
    return Object.keys(this.selectedCategories).filter(
      (category) => this.selectedCategories[category]
    );
  }

  addLostObject() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(est\.utn\.ac\.cr)$/i;

    if (
      !this.newObject.name ||
      !this.newObject.description ||
      !this.newObject.user_email ||
      !this.newObject.category.length
    ) {
      this.toastr.error('Por favor llene todos los espacios');
      return;
    }
    if (!emailRegex.test(this.newObject.user_email)) {
      this.toastr.error('El formato del correo es incorrecto');
      return;
    }

    const fixedSafekeeper = { user_email: 'semataoe@utn.ac.cr' };

    this.newObject.safekeeper = [fixedSafekeeper];

    this.srvlostObjects.addObjects(this.newObject).subscribe(
      () => {
        this.toastr.success('Objeto añadido exitosamente');
        this.loadObjects();
        this.closeModal();
      },
      (error) => {
        this.toastr.error('Error al añadir el objeto');
      }
    );
  }

  closeModal() {
    this.resetForm();
    const modalElement = this.addModal.nativeElement;
    const backdropElement = document.querySelector('.modal-backdrop');

    modalElement.classList.remove('show');
    modalElement.style.display = 'none';

    if (backdropElement) {
      backdropElement.parentNode!.removeChild(backdropElement);
    }

    document.body.classList.remove('modal-open');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreviewUrl = null;
    const fileInput = document.getElementById('item-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  resetForm() {
    this.newObject = {
      category: [],
      name: '',
      description: '',
      user_email: '',
    };
    this.imagePreviewUrl = null;
    this.dataSource.filter = '';
    this.selectedCategories = {};
  }

  deleteObject(id: string): void {
    this.srvlostObjects.deleteObjects(id).subscribe(
      () => {
        this.toastr.success('Objeto eliminado con éxito');
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item._id !== id
        );
      },
      (error) => {
        // Manejar errores específicos basados en el código de estado
        if (error.status === 403) {
          const errorMessage =
            error.error?.message ||
            'No tienes permiso para acceder a este recurso.';
          this.toastr.error(errorMessage, 'Error');
        } else if (error.status === 404) {
          this.toastr.error('El objeto no se encontró.', 'Error');
        } else if (error.status === 500) {
          this.toastr.error('Se produjo un error en el servidor.', 'Error');
        } else {
          this.toastr.error('Error inesperado al eliminar el objeto.', 'Error');
        }
      }
    );
  }

  onRowClick(row: any) {}

  capitalizeFirstLetter(text: string): string {
    if (!text) return 'No disponible';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(LostItemsComponent, {
      width: '500px',
      data: { ...item },
    });
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(ShowDialogComponent, {
      width: '520px',
      maxHeight: '80vh',

      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadObjects();
        if (result.action === 'edit') {
          this.openEditDialog(result.data);
        } else if (result.action === 'delete') {
          this.deleteObject(result.data._id);
        }
      }
    });
  }
}
