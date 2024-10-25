    import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
    import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
    import { CreateResumeService } from '../../create-resume.service';
  import { IonInput } from '@ionic/angular';

    @Component({
      selector: 'app-education',
      templateUrl: './education.component.html',
      styleUrls: ['./education.component.scss'],
    })
    export class EducationComponent  implements OnInit {
    
  isEducationOpen: boolean = false;
  isInterDiplomaOpen: boolean = false;
  isDegreeOpen: boolean = false;
  educationDetails: any = {};
  // educationForm: FormGroup;
  // interDiplomaForm:FormGroup;

  showEducationSubmittedData: boolean = false;
  showInterDiplomaSubmittedData: boolean = false;
  showDegreeSubmittedData: boolean = false;

  educationType: any = '';
  DegreeEducationType: any = '';

  isSelectOpen: boolean = false;

  closeRow: boolean = true;
  closeRow1: boolean = true;
  closeRow2: boolean = true;
  intergpa:any="";
  degreegpa:any="";
  schoolGpa: any = '';
  submitted = false;
  // degreeform:FormGroup;
  schoolName:any=''
  schoolLocation:any=" "
  schoolStartDate:any=""
  schoolLastDate:any=""

  interCollageName: string = '';
  interEducationType: any = '';
  interLocation: string = '';
  intersStartDate: any = '';
  interEndDate: any = '';
  collegeDocuments: any[] = [];

  
  universityCollege: string = '';
  degreeLocation: string = '';
  degreeStartDate: any = '';
  degreeEndDate: any = '';

  constructor(
    private elementRef: ElementRef,
    public service: CreateResumeService,
    private fb: FormBuilder
  ) { 
   
   
  }

  ngOnInit() {
    console.log(this.educationType, 'education-type',this.schoolName,this.schoolLocation);
    
  }

  toggleEducation() {
  this.isEducationOpen=true;
  
  }

  displaySelected() {
    console.log(this.educationType, 'Selected Education Type');
  }


  toggleInterDiploma() {
    if(this.isEducationOpen){
      this.isEducationOpen=false;
      this.showEducationSubmittedData=true;
      this.closeRow=false
    }
   this.isInterDiplomaOpen=true
  }

  toggleDegree() {
   if(this.isInterDiplomaOpen){
    this.showInterDiplomaSubmittedData=true;
    this.isInterDiplomaOpen=false;
    this.closeRow1=false
   }

   this.isDegreeOpen=true
  }

  showSchoolInputs() {
    this.closeRow = true;
    this.isEducationOpen = true;
    this.showEducationSubmittedData = false;
  }

  showInterInputs() {
    this.closeRow1 = true;
    this.isInterDiplomaOpen = true;
    this.showInterDiplomaSubmittedData = false;
  }

  showDegreeInputs() {
    this.closeRow2 = true;
    this.isDegreeOpen = true;
    this.showDegreeSubmittedData = false;
  }

  focusInput(input: IonInput) {
    input.getInputElement().then((el) => el.focus());
    console.log('Focused on input');
  }

  submitEducationDetails() {
    this.submitted = true; // Mark form as submitted

  
     
      const educationDetails = {
        ssc: {
          school_name: this.schoolName,
          education_type: this.educationType,
          location: this.schoolLocation,
          start_date: this.schoolStartDate,
          end_date: this.schoolLastDate,
          gpa: this.schoolGpa,
          school_documents: [], // Add documents if needed
        },
        stepIndex: 4,
      };

      // Call the API to submit the data
      this.service.submitSchoolDetails(educationDetails).subscribe(
        (response) => {
          console.log('Education details submitted successfully', response);
          this.showEducationSubmittedData = true; // Show the submitted data
          // form.resetForm(); // Reset form after submission
        },
        (error) => {
          console.error('Error submitting education details', error);
        }
      );
    
  }
  submitInterDetails(form: NgForm) {
    if (form.valid) {
      const educationInterDetails = {
        inter: {
          institute_name: this.interCollageName,
          field_of_study: this.interEducationType,
          location: this.interLocation,
          start_date: this.intersStartDate,
          end_date: this.interEndDate,
          college_documents: [],
        },
        stepIndex: 4,
      };

      this.service.submitInterDetails(educationInterDetails).subscribe(
        (response) => {
          console.log('Intermediate/Diploma details submitted successfully', response);
          this.showInterDiplomaSubmittedData = true;
          form.resetForm();
        },
        (error) => {
          console.error('Error submitting Intermediate/Diploma details', error);
        }
      );
    } else {
      console.error('Intermediate/Diploma form is invalid');
    }
  }

  submitDegreeDetails(form: NgForm) {
    // if (form.valid) {
    //   const degreeDetails = {
    //     degree: {
    //       university_name: this.universityCollege,
    //       field_of_study: this.DegreeEducationType,
    //       location: this.degreeLocation,
    //       start_date: this.degreeStartDate,
    //       end_date: this.degreeEndDate,
    //       degree_documents: [],
    //     },
    //     stepIndex: 4,
    //   };

    //   this.service.submitDegreeDetails(degreeDetails).subscribe(
    //     (response) => {
    //       console.log('Degree details submitted successfully', response);
    //       this.showDegreeSubmittedData = true;
    //       form.resetForm();
    //     },
    //     (error) => {
    //       console.error('Error submitting Degree details', error);
    //     }
    //   );
    // } else {
    //   console.error('Degree form is invalid');
    // }
  }
  // @HostListener('document:click', ['$event'])
  // handleClickOutside(event: Event) {
  //   const clickedInsideForm = this.elementRef.nativeElement.contains(event.target);
  //   const clickedOnSelect = (event.target as HTMLElement).closest('ion-select, .select-interface, .alert-wrapper');

    
  //   if (!clickedInsideForm && !clickedOnSelect) {
  //     this.isEducationOpen = false;
  //   }
  //     if (this.isInterDiplomaOpen) {
  //       this.isInterDiplomaOpen = false;
  //       this.showInterDiplomaSubmittedData = true;  
  //     }
  //     if (this.isDegreeOpen) {
  //       this.isDegreeOpen = false;
  //       this.showDegreeSubmittedData = true;
  //     }
  //   }
  }
    