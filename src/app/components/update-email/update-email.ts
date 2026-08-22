import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    emailId: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private svc: EmployeeService) {}

  updateEmail(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.employeeUpdate.id) {
      this.errorMessage = 'Please enter a valid Employee ID.';
      return;
    }

    if (!this.employeeUpdate.emailId.trim()) {
      this.errorMessage = 'Please enter the new email address.';
      return;
    }

    console.log(
      'Updating employee email:',
      this.employeeUpdate
    );

    this.svc.updateEmail(this.employeeUpdate)
      .subscribe({

        next: (response) => {

          console.log('Email updated:', response);

          this.successMessage =
            response || 'Employee email updated successfully.';

          this.employeeUpdate.emailId = '';

        },

        error: (err) => {

          console.error('Email update failed:', err);

          this.errorMessage =
            'Unable to update email. Please check the Employee ID and try again.';

        }

      });

  }

}