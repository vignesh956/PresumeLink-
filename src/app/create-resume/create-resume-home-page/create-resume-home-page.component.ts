import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutMeComponent } from '../components/about-me/about-me.component';
import { HttpClient } from '@angular/common/http';
import { ObjectiveComponent } from '../components/objective/objective.component';
import { EducationComponent } from '../components/education/education.component';
import { CreateResumeService } from '../create-resume.service';

@Component({
  selector: 'app-create-resume-home-page',
  templateUrl: './create-resume-home-page.component.html',
  styleUrls: ['./create-resume-home-page.component.scss'],
})
export class CreateResumeHomePageComponent  implements OnInit {
  progress: number = 0;
  activeStepIndex: number = 0;
  stepIncrement: number = 10;
  rangeValue = 0;


  ActiveStep: number = 1;
  
  @ViewChild(AboutMeComponent, { static: false }) aboutMeComponent!: AboutMeComponent; 
  @ViewChild(ObjectiveComponent, { static: false }) objectiveComponent!: ObjectiveComponent;
  @ViewChild(EducationComponent, { static: false }) educationComponent!: EducationComponent;

  // Define steps with corresponding component names
  steps = [
    {
      name: 'Aboutme',
      defaultIcon: 'assets/icon/Group 1000010253 (2).png',
      activeIcon: 'assets/icon/Group 1000010253 (1).png ',
      isActive: false,
    },
    {
      name: 'objective',
      activeIcon: ' assets/icon/Group 1000010254.png',
      defaultIcon: 'assets/icon/Group 1000010254 (1).png ',
      
      isActive: false,
    },
    {
      name: 'education',
      defaultIcon: ' assets/icon/Group 1000009460 (1).png',
      activeIcon: 'assets/icon/Group 1000009460.png',
      isActive: false,
    }, {
      name: 'skills',
      defaultIcon: 'assets/icon/Group 1000009461 (1).png',
      activeIcon: 'assets/icon/Group 1000009461.png',
      isActive: false,
    },
    {
      name: 'projects',
      defaultIcon: 'assets/icon/Group 1000010245 (2).png',
      activeIcon: 'assets/icon/Group 1000010245 (1).png',
      isActive: false,
    },
    {
      name: 'experience',
      defaultIcon: 'assets/icon/Group 1000010246 (1).png',
      activeIcon: 'assets/icon/Group 1000010246.png',
      isActive: false,
    },
    {
      name: 'Certifications',
      defaultIcon: 'assets/icon/Group 1000002138 (1).png',
      activeIcon: 'assets/icon/Group 1000002138.png',
      isActive: false,
    },
    {
      name: 'Languages',
      defaultIcon: ' assets/icon/Group 1000010250.png',
      activeIcon: 'assets/icon/Group 1000010250 (1).png',
      isActive: false,
    },
    {
      name: 'Social',
      defaultIcon: ' assets/icon/Group 1000010251 (1).png ',
      activeIcon: 'assets/icon/Group 1000010340.png',
   
      isActive: false,
    },
    {
      name: 'Interests',
      defaultIcon: 'assets/icon/Group 1000010339.png',
      activeIcon: 'assets/icon/Group 1000010251.png',
      isActive: false,
    },  
    
  ];
 
  // Visibility state object for components
  componentsVisibility: { [key: string]: boolean } = {
    Aboutme: false,
    objective: false,
    education: false,
    skills: false,
    projects: false,
    experience: false,
    Certifications: false,
    Languages : false,
    Social:false,
    Interests:false
  };

  constructor(private http: HttpClient , public createResumeService :CreateResumeService) {}

  ngOnInit(): void {
    this.showComponent('Aboutme'); // Display the first component initially
  }


  // Method to toggle the active step and display the corresponding component
  toggleStep(step: any) {
    // Set all steps to inactive
    this.steps.forEach((s) => (s.isActive = false));
    // Activate the clicked step
    step.isActive = true;
    this.activeStepIndex = this.steps.indexOf(step);
    // Show the corresponding component
    this.showComponent(step.name);
    this.updateProgress();
  }

  // Show the specified component and hide others
  showComponent(componentName: string) {
    // Reset visibility for all components
    for (let key in this.componentsVisibility) {
      this.componentsVisibility[key] = false;
    }
    // Show the selected component
    if (this.componentsVisibility.hasOwnProperty(componentName)) {
      this.componentsVisibility[componentName] = true;
    }
  }

  // Updates the progress based on the active step
  updateProgress() {
    this.progress = (this.activeStepIndex + 1) * this.stepIncrement;
    if (this.progress > 100) {
      this.progress = 100;
    }
  }

  // Update range display value
  updateDisplay(event: any) {
    this.rangeValue = event.detail.value;
    console.log('Range changed:', this.rangeValue);
  }





  previousStep() {
    if (this.ActiveStep > 1) {
      this.ActiveStep--;
      console.log(this.ActiveStep ,';');
    }
  }

nextStep() {
  const userDataString = localStorage.getItem('userData');
  const data: any = userDataString ? JSON.parse(userDataString) : null;
  
  const employeeId = data?.id;
  const token = data?.accessToken;

  switch (this.ActiveStep) {
    case 1:
      console.log(this.aboutMeComponent, 'About Me Component');
      if (this.aboutMeComponent.profileForm.valid) {
        const personalDetails = this.aboutMeComponent.profileForm.value; 
        
        this.createResumeService.submitSscDetails(employeeId, personalDetails, token)
          .subscribe(
            response => {
              console.log('Success:', response);
              this.ActiveStep++; 
            },
            error => {
              console.error('Error submitting personal details:', error);
            }
          );
      } else {
        this.ActiveStep++; 
        console.warn('Personal details form is not valid.');
      }
      break;

    case 2:
      if (this.objectiveComponent.copyform.valid) {

        const educationDetails: any = {
          examples: [this.objectiveComponent.copyform.value.summery],
          objective_description: this.objectiveComponent.copyform.value.summery,
          stepIndex: 3,
        };
        this.createResumeService.submitCopyDetails(employeeId, educationDetails, token)
          .subscribe(
            response => {
              console.log('Success:', response);
              this.ActiveStep++; 
            },
            error => {
              console.error('Error submitting education details:', error);
            }
          );
      } else {
        console.warn('Objective form is not valid.');
      }
      break;

    default:
      console.warn('Invalid step.');
      break;
  }
}


}
