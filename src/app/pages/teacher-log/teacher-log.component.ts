import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teacher-log',
  templateUrl: './teacher-log.component.html',
  styleUrl: './teacher-log.component.css',
})
export class TeacherLogComponent {
  displayedColumns: string[] = ['name', 'computer_number', 'date'];

  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
