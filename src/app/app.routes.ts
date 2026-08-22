import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [

{
path:'',
component:Dashboard
},

{
path:'employee',
loadComponent:()=>import('./components/employee-list/employee-list')
.then(m=>m.EmployeeList)
},

{
path:'department',
loadComponent:()=>import('./components/department/department')
.then(m=>m.Department)
},

{
path:'add',
loadComponent:()=>import('./components/add-employee/add-employee')
.then(m=>m.AddEmployee)
},


{
path:'update-email',
loadComponent:()=>import('./components/update-email/update-email')
.then(m=>m.UpdateEmail)
},

{
path:'delete',
loadComponent:()=>import('./components/delete-employee/delete-employee')
.then(m=>m.DeleteEmployee)
},

{
path:'salary',
loadComponent:()=>import('./components/salary-upgrade/salary-upgrade')
.then(m=>m.SalaryUpgradeComponent)
},

];