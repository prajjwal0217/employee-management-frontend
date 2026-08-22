// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   imports: [],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css',
// })
// export class Dashboard {}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class Dashboard {

  services = [

    {
      title: 'View Employee',
      description: 'Search employee using Employee ID.',
      route: '/employee'
    },

    {
      title: 'Department Search',
      description: 'View all employees of a department.',
      route: '/department'
    },

    {
      title: 'Add Employee',
      description: 'Register a new employee.',
      route: '/add'
    },

    {
      title: 'Update Email',
      description: 'Modify employee email address.',
      route: '/update-email'
    },

    {
      title: 'Delete Employee',
      description: 'Remove an employee record.',
      route: '/delete'
    },

    {
      title: 'Salary Upgrade',
      description: 'Increase salary department-wise.',
      route: '/salary'
    }

  ];

}