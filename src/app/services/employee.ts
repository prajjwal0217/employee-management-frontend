import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  firstName: string;
  lastName: string;
  emailId: string;
  department: string;
  salary: number;
}

export interface EmployeeUpdate {
  id: number;
  email: string;
}

export interface SalaryUpgrade {
  department: string;
  increment: number;
}

@Injectable({
  providedIn: 'root',
})

export class EmployeeService{
  private base = '/api';
  private http = inject(HttpClient);

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/view/${id}`);
  }

  getEmployeesByDepartment(department: string): Observable<Employee[]> {
  return this.http.get<Employee[]>(
    `${this.base}/view/department/${department}`
  );
  }

  addEmployee(employee: Employee): Observable<string> {
  return this.http.post(
    `${this.base}/add/employee`,
    employee,
    {
      responseType: 'text'
    }
  );
  }

  updateEmail(employeeUpdate: EmployeeUpdate): Observable<string> {
  return this.http.patch(
    `${this.base}/update/email`,
    employeeUpdate,
    {
      responseType: 'text'
    }
  );
  }

  deleteEmployee(id: number): Observable<string> {

  return this.http.delete(
    `${this.base}/remove/${id}`,
    {
      responseType: 'text'
    }
  );

  }

  updateSalary(salaryUpgrade: SalaryUpgrade): Observable<string> {

  return this.http.post(
    `${this.base}/update/salary`,
    salaryUpgrade,
    {
      responseType: 'text'
    }
  );

  }
}


