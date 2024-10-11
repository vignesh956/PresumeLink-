import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
})
export class ObjectiveComponent  implements OnInit {

 

  submitted = false;
  displayedText: string = ''; 
  clickedParagraphId: string = '';
  backgroundColor: string = ' var(--Blue, #053750)';
  showCopyText: string = ''; 
  objectiveId: string = '12345'; 
  employeeId = '6703af96d431a73e0fa107c2';
  copyform!:FormGroup;
  accessToken:any="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDNhZjk2ZDQzMWE3M2UwZmExMDdjMiIsImVtYWlsIjoicHZtYWhlc2g3OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcyODUzOTk5MSwiZXhwIjoxNzI4NjI2MzkxfQ.ZwcuxirRK9vxXByRxoRpOgOnDtIgrl3tDvQVg8GEI5Q";
  constructor(public fb:FormBuilder ,public copyservice :CreateResumeService) {
    
     this.copyform = this.fb.group({
      summery: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(400),
        ],
      ]
    })
   }
     
   get validationCheck() {
    return this.copyform.controls;
  }




  objectiveData: any = {
    examples: [this.displayedText],
    objective_description: '',
    stepIndex: 3,
  };


  ngOnInit() {}

  updateDisplayedText(event: MouseEvent, paragraphId: string) {
    const target = event.currentTarget as HTMLElement;
    const textContent = target.querySelector('ion-text')?.innerText || '';

    this.displayedText = textContent;
    this.clickedParagraphId = paragraphId;
    this.showCopyText = paragraphId;
    const token = 'your-auth-token';
   
    // Replace with your logic to get the token

    // this.serice.updateObjectiveData(this.employeeId, this.objectiveData, token).subscribe(
    //   (response) => {
    //     console.log('Data updated successfully:', response);
    //   },
    //   (error) => {
    //     console.error('Error updating data:', error);
    //   }
    // );
    setTimeout(() => {
      this.showCopyText = '';
    }, 200000);
  }


submittextDetails() {
  const copyDetails: any = {
    examples: [this.displayedText],
    objective_description: '',
    stepIndex: 3,
  };

  this.copyservice.submitCopyDetails(this.employeeId, copyDetails, this.accessToken)
    .subscribe(
      response => console.log('Copy details updated:', response),
      error => console.error('Error updating copy details:', error)
    );
}


nextStep() {
  // if (this.activeStepIndex < this.steps.length - 1) {
  //   this.activeStepIndex++;
  //   this.toggleStep(this.steps[this.activeStepIndex]);
  // }
}

// Function to go to the previous step
previousStep() {
  // if (this.activeStepIndex > 0) {
  //   this.activeStepIndex--;
  //   this.toggleStep(this.steps[this.activeStepIndex]);
  // }
}
    }
  

