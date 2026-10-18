import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import {
  EmployeeService,
  EmployeeUpdate
} from '../../services/employee';

@Component({
  selector: 'app-update-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-email.html',
  styleUrl: './update-email.css'
})

export class UpdateEmail {

  employeeUpdate: EmployeeUpdate = {
    id: 0,
    email: ''
  };

  successMessage:string='';
  errorMessage:string='';
  isSubmitting = false;

  constructor(private svc: EmployeeService) {
  }

  updateEmail(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.isSubmitting) {
      return;
    }

    if (!this.employeeUpdate.id) {
      this.errorMessage = 'Please enter a valid Employee ID.';
      return;
    }

    if (!this.employeeUpdate.email.trim()) {
      this.errorMessage = 'Please enter the new email address.';
      return;
    }

    console.log(
      'Updating employee email:',
      this.employeeUpdate
    );

    this.isSubmitting = true;

    this.svc.updateEmail(this.employeeUpdate)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({

        next: (response) => {

          console.log('Email updated:', response);

          this.successMessage =
            response.trim() || 'Employee email updated successfully.';
        },

        error: (err) => {

          console.error('Email update failed:', err);

          this.errorMessage =
            typeof err.error === 'string' && err.error.trim()
              ? err.error
              : 'Unable to update email. Please check the Employee ID and try again.';

        }

      });

  }

  clearFeedback(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

}
