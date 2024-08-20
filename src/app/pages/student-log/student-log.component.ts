import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { IAuth } from '../../login/models/login.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-log',
  templateUrl: './student-log.component.html',
  styleUrls: ['./student-log.component.css'],
})
export class StudentLogComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  userAuthenticated: IAuth | null = null;
  StudentName: string = '';

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

  constructor(private store: Store<fromApp.AppState>) {
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

  ngOnInit() {
    this.subscriptions.add(
      this.store.select('auth').subscribe((authState) => {
        this.userAuthenticated = authState.auth;
        this.StudentName = this.userAuthenticated.name;

        console.log(this.userAuthenticated.name);
        console.log(this.userAuthenticated.email);
      })
    );
  }

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
