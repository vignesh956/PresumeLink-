import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent  implements OnInit {

  isEducationOpen = false;
  submitted = false;
  educationType: string = 'ssc';
  isDropdownOpen = false;
  selectedEducationType: string | null = null;
  schoolName: any;
  isSelectOpen:any=true
  location: any;
  startDate: any;
  endDate: any;

  documents: any[] = [];
  employeeId = '66fe8b162ffe0aaf9d6f663a';
  accessToken:any=

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDNhZjk2ZDQzMWE3M2UwZmExMDdjMiIsImVtYWlsIjoicHZtYWhlc2g3OUBnbWFpbC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcyODI5NDg4MSwiZXhwIjoxNzI4MzgxMjgxfQ.c0QtbsmHA4cnHfL6HUxA6fFiPXjNLmRp_Ik4b_FauaU"
  constructor(private elementRef: ElementRef,public service:CreateResumeService) {}
  
  ngOnInit() {
   
  }
  onEducationTypeChange(event: any) {
    this.educationType = event.detail.value; 
  }


  toggleEducation() {
    if (this.isEducationOpen) {
      this.submitted = true;
    }
    this.isEducationOpen = !this.isEducationOpen;
  }


  toggleSelect() {
    this.isSelectOpen = !this.isSelectOpen;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isEducationOpen) {
      this.closeForm();
    }
  }
  selectEducationType(type: string) {
    this.selectedEducationType = type;
    this.isDropdownOpen = false;  
  }
  closeForm() {
    if (this.isEducationOpen) {
      this.submitted = true;
    }
    this.isEducationOpen = false;
   
  } 

  submitEducationDetails(form: NgForm) {
    if (form.valid && this.educationType === 'ssc') {
      const sscDetails = {
        ssc: {
          school_name: this.schoolName,
          education_type: this.educationType,
          location: this.location,
          start_date: this.startDate,
          end_date: this.endDate,
          school_documents: this.documents,
        },
        stepIndex: 4,
      };

      this.service.submitSscDetails(this.employeeId, sscDetails, this.accessToken)
        .subscribe(
          (response: any) => {
            console.log('SSC details updated:', response);
            this.submitted = true;
            // this.router.navigate(['/dashboard']); // Navigate after successful submission
          },
          (error: any) => {
            console.error('Error updating SSC details:', error);
          }
        );
    } else {
      console.error('Form is invalid or education type is not SSC');
    }
  }}
