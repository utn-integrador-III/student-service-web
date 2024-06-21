import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lost-and-found',

  templateUrl: './lost-and-found.component.html',
  styleUrl: './lost-and-found.component.css',
})
export class LostAndFoundComponent {
  displayedColumns: string[] = ['image', 'name', 'category', 'accions'];
  dataSource = new MatTableDataSource<any>(); // Replace 'any' with your actual item type

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
