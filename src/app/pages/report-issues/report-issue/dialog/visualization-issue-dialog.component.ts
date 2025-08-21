import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualization-issue-dialog',
  templateUrl: './visualization-issue-dialog.component.html',
  styleUrls: ['./visualization-issue-dialog.component.css'],
})
export class VisualizationIssueDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VisualizationIssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
