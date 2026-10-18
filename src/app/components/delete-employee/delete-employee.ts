import { Component } from '@angular/core';
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

  successMessage = '';
  errorMessage = '';

  constructor(private svc: EmployeeService) {}

  deleteEmployee(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.employeeId || this.employeeId <= 0) {

      this.errorMessage =
        'Please enter a valid Employee ID.';

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

          this.successMessage =
            response.trim() || 'Employee deleted successfully.';

          this.employeeId = null;

        },

        error: (err) => {

          console.error(
            'Employee deletion failed:',
            err
          );

          this.errorMessage =
            typeof err.error === 'string' && err.error.trim()
              ? err.error
              : 'Unable to delete employee. Please verify the Employee ID and try again.';

        }

      });

  }

}