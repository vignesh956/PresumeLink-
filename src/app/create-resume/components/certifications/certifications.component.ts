import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';
// certificate.model.ts
export interface CourseCertificate {
  course_name: string;
  organisation: string;
  start_date: string;
  end_date: string;
  stepIndex: number;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent  implements OnInit {
  certificate: any = {
    course_name: '',
    organisation: '',
    start_date: '',
    end_date: '',
    stepIndex:8
  };

  // Validation flags
  courseNameInvalid = false;
  organisationInvalid = false;
  startDateInvalid = false;
  endDateInvalid = false;

  constructor(private certificateService: CreateResumeService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Function to add or update a certificate
  addOrUpdateCertificate() {
    // Basic validation before API call
    this.courseNameInvalid = !this.certificate.course_name;
    this.organisationInvalid = !this.certificate.organisation;
    this.startDateInvalid = !this.certificate.start_date;
    this.endDateInvalid = !this.certificate.end_date;

    if (
      this.certificate.course_name &&
      this.certificate.organisation &&
      this.certificate.start_date &&
      this.certificate.end_date &&
      this.certificate.stepIndex
    ) {
      // Create the certificate object for the API, including the stepIndex
      const certificateData = {
        stepIndex:8,
        course_name: this.certificate.course_name,
        organisation: this.certificate.organisation,
        start_date: this.certificate.start_date,
        end_date: this.certificate.end_date,
        
      };
      console.log(certificateData, '???????????????????')

      // Call the service to add or update the certificate
      this.certificateService.updateCertificates(certificateData).subscribe({
        next: (response:any) => {
          console.log('Certificate added/updated successfully:', response);
          // Optionally, reset the form after successful submission
          this.certificate = {
            course_name: '',
            organisation: '',
            start_date: '',
            end_date: '',
            stepIndex:8 
          };
        },
        error: (error:any) => {
          console.error('Error while adding/updating certificate:', error);
        }
      });
    }
  }}