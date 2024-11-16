import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
})
export class ObjectiveComponent  implements OnInit {
  submitted = false;
  displayedText: string = '';
  charCount: number = 0;
  clickedParagraphIndex: number | null = null;

  summary: Array<{ description: string }> = [
    { description: 'Accessibility-focused web designer with 10 years of experience crafting user interfaces that are inclusive and meet WCAG guidelines.' },
    { description: 'Web developer with expertise in building responsive websites and web applications.' },
    { description: 'Mobile app developer specializing in creating native and cross-platform mobile apps.' },
    { description: 'Full-stack developer with a focus on creating scalable backend services and front-end interfaces.' }
  ];

  copyform!: FormGroup;

  constructor(public fb: FormBuilder, public copyservice: CreateResumeService) {
    this.copyform = this.fb.group({
      summary: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]]
    });
  }

  get validationCheck() {
    return this.copyform.controls;
  }

  ngOnInit() {}

  updateCharCount() {
    const value = this.copyform.get('summary')?.value || '';
    this.charCount = value.length;
  }

  copyTextToInput(description: string, index: number) {
    this.displayedText = description;
    this.copyform.patchValue({ summary: this.displayedText });
    this.updateCharCount();
    this.clickedParagraphIndex = index;
    console.log(this.clickedParagraphIndex);
    setTimeout(() => {
      this.clickedParagraphIndex = null;
    }, 1000);
  }

  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;

    if (clipboardData) {
      const pastedData = clipboardData.getData('text');
      const currentValue = this.copyform.get('summary')?.value || '';
      const newValue = currentValue + pastedData;

      if (newValue.length > 400) {
        event.preventDefault();
      } else {
        this.copyform.patchValue({ summary: newValue });
        this.updateCharCount();
      }
    } else {
      console.error('Clipboard data is not available.');
    }
  }

  // Method to submit form and send data to API using PATCH
  submitObjective() {
    // Ensure form is valid
    if (this.copyform.invalid) {
      this.submitted = true;
      return;
    }

    // Construct the data object with only the objective filled
    const data = {
      objective: this.copyform.get('summary')?.value || '',
      first_name: 'hihih    ',
      last_name: 'hlohlohlo',
      email: 'abhishiekoauk@gmail.com',
      gender: 'male ',
      phone: `+919347252317`,
      job_title: 'bjbijbb',
      birth_date: '09/11/2001',
      skills: [],
      interests: [],
      media: [123],
      stepIndex: 10
    };

    console.log('Data to be sent:', data);

    // Call the service to send data
    this.copyservice.submitObjectiveDetails(data).subscribe(
      (response) => {
        console.log('API response:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }}
