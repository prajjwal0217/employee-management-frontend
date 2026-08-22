import { Component } from '@angular/core';
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

  successMessage = '';
  errorMessage = '';

  constructor(private svc: EmployeeService) {}

  updateSalary(): void {

    this.successMessage = '';
    this.errorMessage = '';

    // Validate department
    if (!this.salaryUpgrade.department) {

      this.errorMessage =
        'Please select a department.';

      return;
    }

    // Validate increment
    if (
      this.salaryUpgrade.increment <= 0 ||
      this.salaryUpgrade.increment > 100
    ) {

      this.errorMessage =
        'Please enter an increment between 0 and 100%.';

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

          this.successMessage =
            response || 'Salary updated successfully.';

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

          this.errorMessage =
            'Unable to update salary. Please try again.';

        }

      });

  }

}