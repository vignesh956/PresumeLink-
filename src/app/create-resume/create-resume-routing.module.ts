import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateResumeHomePageComponent } from './create-resume-home-page/create-resume-home-page.component';
import { CareerLevelComponent } from './components/career-level/career-level.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login', pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: CreateResumeHomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateResumeRoutingModule {}
