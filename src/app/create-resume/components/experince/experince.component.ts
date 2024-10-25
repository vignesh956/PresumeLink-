import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experince',
  templateUrl:'./experince.component.html',
  styleUrls: ['./experince.component.scss'],
})
export class ExperinceComponent implements OnInit {
  experinceform!: FormGroup;
  // experincetype: string = 'exp';
  // companyname:any;
  // position:any;
  // location:any;
  // startdate:any;
  // enddate:any;
  // description:any;


  constructor(public fb: FormBuilder) {
    this.experinceform = this.fb.group({
      companyname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      position: ['', Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),],
      location: ['', Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),],
      description: ['', Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      isCurrentlyWorking: [false], // Checkbox value
    });
  }

  get validationCheck() {
    return this.experinceform.controls;
  }

  ngOnInit() {
  
  
        // const experinceDetails = {
        //   exp: {
        //     company_name: this.companyname,
        //     position: this.position,
        //     location: this.location,
        //     start_date: this.startdate,
        //     end_date: this.enddate,
        //     experience_description: this.description
        //   },
        //   stepIndex: 5,
        // };
      }
 
}
