import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  EmployeeService,
  SalaryUpgrade
} from '../../services/employee';

@Component({
  selector: 'app-salary-upgrade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary-upgrade.html',
  styleUrl: './salary-upgrade.css'
})
export class SalaryUpgradeComponent {

  departments: string[] = [
    'HR',
    'Legal',
    'Engineering'
  ];

  salaryUpgrade: SalaryUpgrade = {
    department: '',
    increment: 0
  };

  successMessage = signal('');
  errorMessage = signal('');

  constructor(private svc: EmployeeService) {}

  updateSalary(): void {

    this.clearFeedback();

    // Validate department
    if (!this.salaryUpgrade.department) {

      this.errorMessage.set('Please select a department.');
      return;
    }

    if (
      this.salaryUpgrade.increment <= 0 ||
      this.salaryUpgrade.increment > 100
    ) {

      this.errorMessage.set('Please enter an increment between 0 and 100%.');

      return;
    }

    console.log(
      'Salary upgrade request:',
      this.salaryUpgrade
    );

    this.svc.updateSalary(this.salaryUpgrade)
      .subscribe({

        next: (response) => {

          console.log(
            'Salary updated successfully:',
            response
          );

          const message = typeof response === 'string' ? response.trim() : '';
          this.successMessage.set(message || 'Salary updated successfully.');

          // Reset form
          this.salaryUpgrade = {
            department: '',
            increment: 0
          };

        },

        error: (err) => {

          console.error(
            'Salary update failed:',
            err
          );

          this.errorMessage.set(
            typeof err.error === 'string' && err.error.trim()
              ? err.error
              : 'Unable to update salary. Please try again.'
          );

        }

      });

  }

  clearFeedback(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }

}