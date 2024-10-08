import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { IonicModule } from '@ionic/angular';
import { EmployeeLoginComponent } from './components/login/employee-login/employee-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { HomePageModule } from '../home/home.module';
import { CareerLevelComponent } from '../create-resume/components/career-level/career-level.component';


@NgModule({
  declarations: [LoginComponent,EmployeeLoginComponent, CreateUserComponent , ForgetPasswordComponent,CareerLevelComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule,HttpClientModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    // HomePageModule
    
  ]
})
export class AuthModule { }
