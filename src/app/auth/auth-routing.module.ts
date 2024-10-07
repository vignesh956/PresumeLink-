import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {
    path:'' , redirectTo:'login' , pathMatch:'full'
  },
  {
    path:'login' , component:LoginComponent
  },
  {
    path:'signup', component:CreateUserComponent
  },
  {
    path:'forget-password', component:ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
