import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  updateEducationDetails() {
    const updatedEducationDetails = {
      ssc: {
        school_name: this.schoolName,
        education_type: this.educationType,
        location: this.schoolLocation,
        start_date: this.schoolStartDate,
        end_date: this.schoolLastDate,
        gpa: this.schoolGpa,
        school_documents: [], // Add documents if needed
      },
      inter: {
        institute_name: this.interCollageName,
        field_of_study: this.interEducationType,
        location: this.interLocation,
        start_date: this.intersStartDate,
        end_date: this.interEndDate,
        college_documents: [], // Add documents if needed
      },
      degree: {
        university_name: this.universityCollege,
        field_of_study: this.educationType,  // Replace with appropriate degree type
        location: this.degreeLocation,
        start_date: this.degreeStartDate,
        end_date: this.degreeEndDate,
        degree_documents: [], // Add documents if needed
      },
      stepIndex: 4,
    };

    // Call the PATCH API method
    this.service.patchEducationDetails(updatedEducationDetails).subscribe(
      (response) => {
        console.log('Education details updated successfully', response);
      },
      (error) => {
        console.error('Error updating education details', error);
      }
    );
  }
}
 
