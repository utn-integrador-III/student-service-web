import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-log',
  templateUrl: './student-log.component.html',
  styleUrls: ['./student-log.component.css'],
})
export class StudentLogComponent implements OnInit {
  displayedColumns: string[] = ['name', 'computer_number', 'date', 'accions'];

  dataSource = new MatTableDataSource<any>([
    {
      name: 'Kenneth Piedra',
      computer_number: '002',
      date: '2024-07-08',
      actionNumber: 2,
    },
  ]);

  imageUrlsLeft: any[] = [];
  imageUrlsRight: any[] = [];
  selectedImage: any = null; // Variable para mantener la imagen seleccionada

  constructor() {
    for (let i = 1; i <= 20; i++) {
      let formattedNumber = ('0' + i).slice(-2);
      let image = {
        imageUrl: `/assets/images/computer.png`,
        number: formattedNumber,
      };

      if (i <= 10) {
        this.imageUrlsLeft.push(image);
      } else {
        this.imageUrlsRight.push(image);
      }
    }
  }

  ngOnInit(): void {}

  selectedComputerNumber: string;

  onImageClick(image: any): void {
    this.selectedComputerNumber = image.number;

    if (this.selectedImage) {
      this.selectedImage.imageUrl = '/assets/images/computer.png';
    }
    image.imageUrl = '/assets/images/redComputer.png';
    this.selectedImage = image;
  }
  deleteOption() {}
}
