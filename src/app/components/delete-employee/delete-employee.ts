import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-employee.html',
  styleUrl: './delete-employee.css'
})
export class DeleteEmployee {

  employeeId: number | null = null;

  successMessage = signal('');
  errorMessage = signal('');

  constructor(private svc: EmployeeService) {}

  deleteEmployee(): void {

    this.clearFeedback();

    if (!this.employeeId || this.employeeId <= 0) {

      this.errorMessage.set(
        'Please enter a valid Employee ID.'
      );

      return;
    }

    /*
     * Confirmation before deleting
     */
    const confirmed = confirm(
      `Are you sure you want to delete Employee ID ${this.employeeId}?`
    );

    if (!confirmed) {
      return;
    }

    console.log(
      'Deleting employee:',
      this.employeeId
    );

    this.svc.deleteEmployee(this.employeeId)
      .subscribe({

        next: (response) => {

          console.log(
            'Employee deleted successfully:',
            response
          );

          const message = typeof response === 'string' ? response.trim() : '';
          this.successMessage.set(message || 'Employee deleted successfully.');

          this.employeeId = null;

        },

        error: (err) => {

          console.error(
            'Employee deletion failed:',
            err
          );

          this.errorMessage.set(
            typeof err.error === 'string' && err.error.trim()
              ? err.error
              : 'Unable to delete employee. Please verify the Employee ID and try again.'
          );

        }

      });

  }

  clearFeedback(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }

}