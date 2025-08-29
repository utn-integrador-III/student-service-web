import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClassesDialogComponent } from './classes-dialog/classes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Booking } from '../../Services/booking/booking.service';
import { DataTransferService } from '../TranferServices/transfetServices.component';

@Component({
  selector: 'app-pick-classes',
  templateUrl: './pick-classes.component.html',
  styleUrls: ['./pick-classes.component.css'],
})
export class PickClassesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['subject', 'professor', 'lab'];

  constructor(
    public dialog: MatDialog,
    public Booking: Booking,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row: any) {
    this.dataTransferService.setSelectedRowData(row);
    this.dialog.open(ClassesDialogComponent, {
      width: '500px',
      data: row,
    });
  }

  fill(element: any): void {
    console.log('Delete button clicked for:', element);
  }

  loadBookings(): void {
    this.Booking.getBookings().subscribe(
      (response: any) => {
        if (response && response.data) {
          const bookings = response.data;
          this.dataSource = new MatTableDataSource(bookings);
        } else {
          console.error('Data property not found in the response');
        }
      },
      (error) => {
        console.error('Error loading bookings', error);
      }
    );
  }
}
