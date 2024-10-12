import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateResumeHomePageComponent } from './create-resume-home-page/create-resume-home-page.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login', pathMatch: 'full'
  // },
  
{path:"stepper",component:CreateResumeHomePageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class CreateResumeRoutingModule { }
