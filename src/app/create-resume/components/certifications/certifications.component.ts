import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent  implements OnInit {
  certificationsForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private service:CreateResumeService) {
    this.certificationsForm = this.formBuilder.group({
      course_name: ['', Validators.required],
      organisation: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  get f() {
    return this.certificationsForm.controls;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (this.certificationsForm.invalid) {
      return;
    }

    const formValue = this.certificationsForm.value;
    const payload = {
      course_name: formValue.course_name,
      organisation: formValue.organisation,
      start_date: formValue.start_date,
      end_date: formValue.end_date,
      stepIndex: 8
    };

    // Call the service to submit the form
    this.service.submitCertification(payload).subscribe(
      response => {
        console.log('Submission successful', response);
        // Handle success response (e.g., show a success message, redirect, etc.)
      },
      error => {
        console.error('Submission failed', error);
        // Handle error response (e.g., show an error message)
      }
    );

    // Print form values to the console
    console.log(this.certificationsForm.value);
  }
}
