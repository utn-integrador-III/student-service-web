import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClassesDialogComponent } from './classes-dialog/classes-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pick-classes',
  templateUrl: './pick-classes.component.html',
  styleUrls: ['./pick-classes.component.css'],
})
export class PickClassesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['course', 'professor', 'lab'];

  constructor(public dialog: MatDialog) {
    const data = [
      {
        course: 'Fundamentos de datos',
        professor: 'Ever barahona ',
        lab: 'Lab-306',
      },
      {
        course: 'Fundamento de redes',
        professor: 'Floribeth Vindas Parras',
        lab: 'Lab-303',
      },
    ];

    this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row: any) {
    this.dialog.open(ClassesDialogComponent, {
      width: '500px',
      data: row,
    });
  }

  fill(element: any): void {
    console.log('Delete button clicked for:', element);
  }
}
