import { Component, signal } from '@angular/core';
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

  successMessage = signal('');
  errorMessage = signal('');
  isSubmitting = signal(false);

  constructor(private svc: EmployeeService) {
  }

  updateEmail(): void {

    this.clearFeedback();

    if (this.isSubmitting()) {
      return;
    }

    if (!this.employeeUpdate.id) {
      this.errorMessage.set('Please enter a valid Employee ID.');
      return;
    }

    if (!this.employeeUpdate.email.trim()) {
      this.errorMessage.set('Please enter the new email address.');
      return;
    }

    console.log(
      'Updating employee email:',
      this.employeeUpdate
    );

    this.isSubmitting.set(true);

    this.svc.updateEmail(this.employeeUpdate)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({

        next: (response) => {

          console.log('Email updated:', response);

          this.successMessage.set(
            response.trim() || 'Employee email updated successfully.'
          );
        },

        error: (err) => {

          console.error('Email update failed:', err);

          this.errorMessage.set(
            typeof err.error === 'string' && err.error.trim()
              ? err.error
              : 'Unable to update email. Please check the Employee ID and try again.'
          );

        }

      });

  }

  clearFeedback(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }

}
