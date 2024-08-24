import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingComputer {
  private URL_BOOKING_COMPUTER = environment.URL_BOOKING_COMPUTER;

  constructor(private http: HttpClient) {}

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_BOOKING_COMPUTER);
  }

  addBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(this.URL_BOOKING_COMPUTER, bookingData);
  }
}
