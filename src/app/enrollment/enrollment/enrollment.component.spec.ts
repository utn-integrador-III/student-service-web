import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  message: string = '';
  showVerification: boolean = false; // Add this line

  constructor(private enrollmentService: EnrollmentService) {}

  onSubmit() {
    if (!this.name || this.name.length < 2) {
      this.message = 'Name must be at least 2 characters long';
      return;
    }

    if (!this.email || !this.email.includes('utn.ac.cr')) {
      this.message = 'Email must be a valid UTN email address';
      return;
    }

    if (!this.password || this.password.length < 8) {
      this.message = 'Password must be at least 8 characters long';
      return;
    }

    this.enrollmentService.enroll(this.name, this.email, this.password).subscribe(
      (response: any) => {
        this.message = response.message;
        if (response.status === 'success') {
          this.showVerification = true;
        }
      },
      (error) => {
        this.message = `${error.status} ${error.statusText}: ${error.error.message}`;
      }
    );
  }

  verifyCode() {
    this.enrollmentService.verify(this.email, this.verificationCode).subscribe(
      (response: any) => {
        this.message = response.message;
        if (response.status === 'success') {
          this.message = 'User successfully verified and enrolled.';
          this.showVerification = false;
        }
      },
      (error) => {
        this.message = error.message;
      }
    );
  }
}
