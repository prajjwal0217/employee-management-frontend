// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EmployeeService, Employee} from '../../services/employee';

// @Component({
//   selector: 'app-department',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './department.html',
//   styleUrl: './department.css',
// })

// export class Department {

//   departments = [
//     'HR',
//     'Legal',
//     'Engineering'
//   ];

//     employees?: Employee[];
//     errorMessage = '';
//     selectedDepartment?: string;

//     constructor(private svc: EmployeeService) {}
  
//     loadEmployees() {

//       this.errorMessage = '';

//       this.employees = [];

//       if (!this.selectedDepartment) {

//       this.errorMessage = 'Please select a department.';

//       return;

//       }
    

//     this.svc.getEmployeesByDepartment(this.selectedDepartment)
//       .subscribe({

//         next: (data) => {

//           this.employees = data;
//         },

//         error: () => {

//           this.errorMessage = 'No employees found.';

//         }

//       });
//     }
// }

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-department',
  imports: [CommonModule, FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department {

  departments: string[] = [
    'HR',
    'Legal',
    'Engineering'
  ];

  selectedDepartment: string='';

  employees = signal<Employee[] | undefined>(undefined);

  errorMessage = signal('');

  constructor(private svc: EmployeeService) {}

  loadEmployees(): void {

    // Clear previous result immediately
    this.employees.set(undefined);
    this.errorMessage.set('');

    if (this.selectedDepartment === '') {
      this.errorMessage.set('Please select a department.');
      return;
    }

    console.log('Searching department:', this.selectedDepartment);

    this.svc.getEmployeesByDepartment(this.selectedDepartment)
      .subscribe({

        next: (data: Employee[]) => {

          console.log('API response:', data);

          this.employees.set(data);

          console.log('Employees assigned:', this.employees);

        },

        error: (err) => {

          console.error('Department search failed:', err);

          this.employees.set(undefined);

          this.errorMessage.set('Unable to find employees for this department.');

        }

      });

  }
}