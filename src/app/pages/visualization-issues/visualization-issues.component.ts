import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visualization-issues',
  templateUrl: './visualization-issues.component.html',
  styleUrl: './visualization-issues.component.css',
})
export class VisualizationIssuesComponent {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'lab',
    'computer',
    'description',
    'date',
    'actions',
  ];

  newObject: any = {};

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row: any) {
    console.log('Fila clicada:', row);
  }
}
