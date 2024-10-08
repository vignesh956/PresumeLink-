import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-level',
  templateUrl: './career-level.component.html',
  styleUrls: ['./career-level.component.scss'],
})
export class CareerLevelComponent  implements OnInit {
  userInput: string = ''; // Model to store user input
  dynamicButtons: string[] = []; // Array to store dynamic button names
  selectedButtons: string[] = [];
  showStepperComponent:any=false;
  ShowGetStartedComponent:any=true;
  constructor(public router : Router) { }

  ngOnInit() {}
  items = [
    { icon: 'assets/icon/student-career.png', text: 'Student' },
    { icon: 'assets/icon/intership-career.png', text: 'Fresher' },
    { icon: 'assets/icon/fresher-career.png', text: 'Internship' },
    { icon: 'assets/icon/experience.png', text: 'Experience' }
  ];
  careerPurpose:any=[{name:"Accounting & Finance"},{name:"Administrative"},{name:"Business & Management"},{name:"Developer"},{name:"Customer Service & Operations"},{name:"Sales"},{name:"Dentist"},{name:"Engineering"},{name:"Marketing"},{name:"IT Software"},{name:"HR & Recruitment "}]
  
    activeButtonIndex: any | null = null; // Track the index of the active button
    ShowComponents(){
      this.router.navigate(['create-resume/home'])

    }
    // Toggle the button state
    toggleButton(index: number) {
      if (this.activeButtonIndex === index) {
        this.activeButtonIndex = null; // Deactivate if clicked again
      } else {
        this.activeButtonIndex = index; // Activate the clicked button
      }
      
    // this.ShowGetStartedComponent=false
    }
    addButton() {
      if (this.userInput.trim()) {
        this.dynamicButtons.push(this.userInput); // Add the user input to dynamicButtons array
        this.userInput = ''; // Clear the input field after adding the button
      }
    }
  
    // Function to select a button and add to selectedButtons array
    selectButton(buttonName: string) {
      if (!this.selectedButtons.includes(buttonName)) {
        this.selectedButtons.push(buttonName); // Add selected button to the selectedButtons array
      }
    }
  
    // Function to remove a button from selectedButtons array
    removeButton(index: number) {
      this.selectedButtons.splice(index, 1); // Remove button from the selectedButtons array
    }
 


}
