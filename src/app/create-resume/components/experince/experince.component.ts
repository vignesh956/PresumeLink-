import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-experince',
  templateUrl: './experince.component.html',
  styleUrls: ['./experince.component.scss'],
})
export class ExperinceComponent  implements OnInit {
  experienceForm!: FormGroup;
  experiences: Array<any> = []; // Array to store experience data

  constructor(private fb: FormBuilder, private experienceService: CreateResumeService) {}

  ngOnInit() {
    this.experienceForm = this.fb.group({
      company_name: ['', Validators.required],
      position: ['', Validators.required],
      location: ['', Validators.required],
      experience_description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      working: [false], // Checkbox for current work status
    });
  }

  submitExperience() {
    if (this.experienceForm.valid) {
      // Create the payload as per the API requirements
      const experienceData = {
        working: this.experienceForm.value.working,
        company_name: this.experienceForm.value.company_name,
        position: this.experienceForm.value.position,
        location: this.experienceForm.value.location,
        start_date: this.experienceForm.value.start_date,
        end_date: this.experienceForm.value.end_date,
        experience_description: this.experienceForm.value.experience_description,
        stepIndex: 7 // Adding stepIndex as per your requirement
      };

      // Call the API service to submit the experience data
      this.experienceService.updateExperience(experienceData).subscribe(
        (response) => {
          console.log('Experience submitted successfully', response);
          // Optionally, push the data to the local experiences array or reset the form
          this.experiences.push(experienceData);
          this.experienceForm.reset();  // Reset the form after submission
        },
        (error) => {
          console.error('Error submitting experience data', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  addExperience() {
    // Reset the form to add another experience
    this.experienceForm.reset();
  }}
