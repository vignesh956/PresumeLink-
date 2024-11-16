import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-experince',
  templateUrl: './experince.component.html',
  styleUrls: ['./experince.component.scss'],
})
export class ExperinceComponent  implements OnInit {
  experienceForm!: FormGroup;
  allExperiences: any[] = []; // Array to store multiple experiences

  constructor(private fb: FormBuilder, private experienceService: CreateResumeService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.experienceForm = this.fb.group({
      working: [false],
      company_name: ['', Validators.required],
      position: ['', Validators.required],
      location: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      experience_description: [''],
      stepIndex: [7], // Static value as required
    });
  }

  // Add experience to the array and reset the form for next input
  addExperience() {
    if (this.experienceForm.invalid) {
      return;
    }
    
    // Add current experience form data to the array
    const experienceData = {
      company_name: this.experienceForm.get('company_name')?.value,
      position: this.experienceForm.get('position')?.value,
      location: this.experienceForm.get('location')?.value,
      start_date: this.experienceForm.get('start_date')?.value,
      end_date: this.experienceForm.get('end_date')?.value,
      working: this.experienceForm.get('working')?.value,
      experience_description: this.experienceForm.get('experience_description')?.value,
    };

    // Push the experience to the array
    this.allExperiences.push(experienceData);

    // Reset the form for the next experience input
    this.experienceForm.reset();
    this.experienceForm.patchValue({ working: false }); // Optionally reset "working" checkbox
  }

  // Submit all experiences to the API
  submitExperience() {
    if (this.allExperiences.length === 0) {
      console.log("No experiences to submit.");
      return;
    }

    const payload = {
      experiences: this.allExperiences, // Submit all experiences together
      stepIndex: 7, // Replace with your dynamic step index if needed
    };

    this.experienceService.updateExperience(payload).subscribe(
      (response) => {
        console.log('Experiences submitted successfully', response);
      },
      (error) => {
        console.error('Error submitting experiences', error);
      }
    );
  }
}
