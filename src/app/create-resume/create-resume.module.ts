import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateResumeRoutingModule } from './create-resume-routing.module';
import { CreateResumeHomePageComponent } from './create-resume-home-page/create-resume-home-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectiveComponent } from './components/objective/objective.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { InterestsComponent } from './components/interests/interests.component';
import { ProjectComponent } from './components/project/project.component';
import { ExperinceComponent } from './components/experince/experince.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { CareerLevelComponent } from './components/career-level/career-level.component';


@NgModule({
  declarations: [
    CreateResumeHomePageComponent,
    AboutMeComponent,
    InterestsComponent,
    ProjectComponent,
    ExperinceComponent,
    SkillsComponent,
    EducationComponent,
    CertificationsComponent,
    LanguagesComponent,
     CareerLevelComponent,
     ObjectiveComponent],
  imports: [
    CommonModule,
    CreateResumeRoutingModule,
    IonicModule,FormsModule,ReactiveFormsModule
  ]
})
export class CreateResumeModule { }
