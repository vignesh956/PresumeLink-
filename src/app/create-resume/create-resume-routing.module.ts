import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateResumeHomePageComponent } from './create-resume-home-page/create-resume-home-page.component';
import { CareerLevelComponent } from './components/career-level/career-level.component';
import { ExperinceComponent } from './components/experince/experince.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'login', pathMatch: 'full'
  // },
<<<<<<< Updated upstream
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: CreateResumeHomePageComponent },
=======
  
{path:"home",component:CreateResumeHomePageComponent},
{
  path:'career-level', component:CareerLevelComponent
},
{path:"stepper",component:CreateResumeHomePageComponent},
{path:"experience",component:ExperinceComponent},
{path:"skill",component:SkillsComponent}

>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateResumeRoutingModule {}
