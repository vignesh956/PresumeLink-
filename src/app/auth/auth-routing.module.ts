import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { EmployeeLoginComponent } from './components/login/employee-login/employee-login.component';
import { HomePage } from '../home/home.page';
import { CareerLevelComponent } from '../create-resume/components/career-level/career-level.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  { path: "login/employee", component: EmployeeLoginComponent },
  { path: "login/create-account", component: CreateUserComponent },
  //  { path: "home", component: HomePage },
  {path:"get-started",component:CareerLevelComponent}
  ,
  {
    path: 'create-account', component: CreateUserComponent
  },
  {
    path: 'Forgot-password', component: ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
