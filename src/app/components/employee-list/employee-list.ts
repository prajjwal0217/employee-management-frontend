import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee} from '../../services/employee';


@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
})

export class EmployeeList {
  employee?: Employee;
  errorMessage = '';

  constructor(private svc: EmployeeService) {}

  load(id: string) {
    const employeeId = Number(id);
    this.employee;
    this.errorMessage;

    if (!employeeId) {
      this.errorMessage = 'Please enter a valid employee ID.';
      return;
    }
  
    this.svc.getEmployeeById(employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Employee load failed', err);
        this.employee = undefined;
        this.errorMessage = 'Employee not found in database.';
      }
      
    });
    
  }
  
  // load(idStr: string) {
  //   const id = Number(idStr);
  //   if (!id) {
  //     this.error = 'Please enter a valid id';
  //     this.employee = undefined;
  //     return;
  //   }
  //   this.error = undefined;
  //   this.svc.getEmployeeById(id).pipe(
  //     catchError(() => {
  //       this.error = 'Failed to load employee';
  //       return of(undefined as unknown as Employee);
  //     })
  //   ).subscribe(emp => {
  //     this.employee = emp;
  //   });
  // }
}
