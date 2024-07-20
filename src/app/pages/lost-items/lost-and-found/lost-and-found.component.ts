import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LostAndFoundService } from '../../../Services/service-LostAndFound/LostAndFound.service';
import { LostItemsComponent } from '../lost-items.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lost-and-found',
  templateUrl: './lost-and-found.component.html',
  styleUrls: ['./lost-and-found.component.css'],
})
export class LostAndFoundComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'image',
    'name',
    'description',
    'category',
    'actions',
  ];
  @ViewChild('addModal') addModal!: ElementRef;

  newObject: any = {};

  constructor(
    private srvlostObjects: LostAndFoundService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.loadObjects();
  }

  loadObjects() {
    this.srvlostObjects.getObjects().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource.data = response.data;
      },
      (error) => {
        this.toastr.error('Error al cargar los objectos.');
        console.error('Error al cargar los objectos:', error);
      }
    );
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(LostItemsComponent, {
      width: '500px',
      data: { ...item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex(
          (item) => item._id === result._id
        );

        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();

          this.srvlostObjects.updateObjects(result).subscribe(
            (response) => {
              this.toastr.success('Objeto actualizado exitosamente');
              this.loadObjects();
            },
            (error) => {
              this.toastr.error('Error al actualizar el objeto', error);
            }
          );
        }
      }
    });
  }

  addLostObject() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(est\.utn\.ac\.cr)$/i;

    if (
      !this.newObject.name ||
      !this.newObject.description ||
      !this.newObject.user_email
    ) {
      this.toastr.error('Por favor llene los espacios');
      return;
    }
    if (!emailRegex.test(this.newObject.user_email)) {
      this.toastr.error('El formato del correo es incorrecto');
      return;
    }

    const fixedSafekeeper = { user_email: 'semataoe@utn.ac.cr' };

    this.newObject.safekeeper = [fixedSafekeeper];

    this.srvlostObjects.addObjects(this.newObject).subscribe(
      (response) => {
        this.toastr.success('Objeto añadido exitosamente');
        this.loadObjects();
        this.closeModal();
      },
      (error) => {
        this.toastr.error('Error al añadir el objeto', error);
      }
    );
  }

  closeModal() {
    this.clearForm();
    this.resetModalFields();
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
        const imagePreview = document.getElementById(
          'image-preview'
        ) as HTMLImageElement;
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    const imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    const fileInput = document.getElementById('item-image') as HTMLInputElement;

    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    fileInput.value = '';
  }

  clearForm() {
    this.dataSource.filter = '';
    this.resetImagePreview();
  }

  resetImagePreview() {
    const imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    const fileInput = document.getElementById('item-image') as HTMLInputElement;

    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    if (fileInput) {
      fileInput.value = '';
    }
  }

  resetModalFields() {
    const fileInput = document.getElementById('item-image') as HTMLInputElement;
    const imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    const itemNameInput = document.getElementById(
      'item-name'
    ) as HTMLInputElement;
    const itemCategoryInput = document.getElementById(
      'item-descripcion'
    ) as HTMLInputElement;
    const itemLocationInput = document.getElementById(
      'item-email'
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }
    if (imagePreview) {
      imagePreview.src = '#';
      imagePreview.style.display = 'none';
    }
    if (itemNameInput) {
      itemNameInput.value = '';
    }
    if (itemCategoryInput) {
      itemCategoryInput.value = '';
    }
    if (itemLocationInput) {
      itemLocationInput.value = '';
    }
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
        this.toastr.error('Error al eliminar el objeto');
        console.error('Error al eliminar el objeto:', error);
      }
    );
  }
  onRowClick(row: any) {
    console.log('Fila clicada:', row);
  }
}
