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
  private base = 'http://localhost:8080';
  private http = inject(HttpClient);

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/view/${id}`);
  }

  getEmployeesByDepartment(department: string): Observable<Employee[]> {
  return this.http.get<Employee[]>(
    `${this.base}/view/department/${department}`
  );
  }

  addEmployee(employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(
    `${this.base}/add/employee`,
    employee
  );
  }

  updateEmail(employeeUpdate: EmployeeUpdate): Observable<string> {
  return this.http.patch<string>(
    `${this.base}/update/email`,
    employeeUpdate,
    {
      responseType: 'text' as 'json'
    }
  );
  }

  deleteEmployee(id: number): Observable<string> {

  return this.http.delete<string>(
    `${this.base}/remove/${id}`,
    {
      responseType: 'text' as 'json'
    }
  );

  }

  updateSalary(salaryUpgrade: SalaryUpgrade): Observable<string> {

  return this.http.post<string>(
    `${this.base}/update/salary`,
    salaryUpgrade,
    {
      responseType: 'text' as 'json'
    }
  );

  }
}



