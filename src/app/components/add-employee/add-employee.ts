import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})

export class AddEmployee {

  departments: string[] = [
    'HR',
    'Legal',
    'Engineering'
  ];

  employee: Employee = {
    firstName: '',
    lastName: '',
    emailId: '',
    department: '',
    salary: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(private svc: EmployeeService) {}

  addEmployee(): void {

    this.successMessage = '';
    this.errorMessage = '';

    // Basic validation
    if (
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.emailId ||
      !this.employee.department ||
      !this.employee.salary
    ) {

      this.errorMessage = 'Please fill in all fields.';

      return;
    }

    console.log('Employee being sent:', this.employee);

    this.svc.addEmployee(this.employee).subscribe({

      next: (response) => {

        console.log('Employee added successfully:', response);

        this.successMessage =
          response.trim() || 'Employee added successfully.';

        // Clear form
        this.employee = {
          firstName: '',
          lastName: '',
          emailId: '',
          department: '',
          salary: 0
        };

      },

      error: (err) => {

        console.error('Failed to add employee:', err);

        this.errorMessage =
          typeof err.error === 'string' && err.error.trim()
            ? err.error
            : 'Unable to add employee. Please try again.';

      }

    });

  }

}
