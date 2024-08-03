import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LabManaging } from './../../../Services/lab-Managing/labManaging.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css'],
})
export class ReportIssueComponent implements OnInit {
  displayedColumns: string[] = ['number', 'description', 'date'];
  imageUrlsLeft: any[] = [];
  imageUrlsRight: any[] = [];
  selectedImages: Set<any> = new Set();
  selectedComputerNumber: string = '';
  labs: any[] = [];
  selectedLab: any = null;

  constructor(
    private labManaging: LabManaging,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLabs();
  }

  loadLabs() {
    this.labManaging.getObjects().subscribe((response: any) => {
      console.log('Datos recibidos:', response);
      if (response && Array.isArray(response.data)) {
        this.labs = response.data;

        if (this.labs.length > 0) {
          this.selectedLab = this.labs[0];
          this.updateImageUrls();
        }
      } else {
        console.error('La propiedad `data` no es un array o no está presente');
      }
      this.cdr.detectChanges();
    });
  }

  updateImageUrls() {
    console.log(
      'Actualizando URLs de imágenes para laboratorio:',
      this.selectedLab
    );
    this.imageUrlsLeft = [];
    this.imageUrlsRight = [];

    if (this.selectedLab && this.selectedLab.computers) {
      const computers = this.selectedLab.computers;
      const numberOfComputers = computers.length;

      for (let i = 0; i < numberOfComputers; i++) {
        let computerId = computers[i];
        let image = {
          imageUrl: `/assets/images/computer.png`,
          number: computerId,
        };

        if (i < Math.ceil(numberOfComputers / 2)) {
          this.imageUrlsLeft.push(image);
        } else {
          this.imageUrlsRight.push(image);
        }
      }
    } else {
      console.log(
        'No se encontraron computadoras en el laboratorio seleccionado.'
      );
    }
  }

  onImageClick(image: any): void {
    if (this.selectedImages.has(image)) {
      image.imageUrl = '/assets/images/computer.png';
      this.selectedImages.delete(image);
    } else {
      image.imageUrl = '/assets/images/redComputer.png';
      this.selectedImages.add(image);
    }
    this.updateSelectedComputerNumber();
  }

  updateSelectedComputerNumber() {
    const selectedNumbers = Array.from(this.selectedImages)
      .map((image: any) => image.number)
      .join(', ');
    this.selectedComputerNumber = selectedNumbers;
  }

  onLabSelect(lab: any) {
    console.log('Laboratorio seleccionado:', lab);
    this.selectedLab = lab;
    this.updateImageUrls();
  }
}
