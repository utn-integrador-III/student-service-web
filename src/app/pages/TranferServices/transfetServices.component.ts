import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private selectedRowData: any;

  setSelectedRowData(data: any) {
    this.selectedRowData = data;
  }

  getSelectedRowData() {
    return this.selectedRowData;
  }
}
