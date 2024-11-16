import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
})
export class InterestsComponent  implements OnInit {
  // constructor(public skillsService:CreateResumeService) { }

  ngOnInit() {}
  enteredIntrest: string[] = []; // Array to store user-entered skills
  suggestedIntrest: string[] = ['Prototyping', 'User Research', 'Visual Design', 'Information Architecture']; // Suggested skills array
  newIntrest: string = ''; // Temporary variable to store new skill input

  // Adds a new skill from input
  addIntrest() {
    console.log("kjhkcgvjhkjbv")
    if (this.newIntrest && !this.enteredIntrest.includes(this.newIntrest)) {
      this.enteredIntrest.push(this.newIntrest);
      this.newIntrest = ''; // Clear input after adding
    }
   
  }
  

  // Removes a skill from the entered skills list
  removeIntrest(Intrest: string) {
    this.enteredIntrest = this.enteredIntrest.filter(s => s !== Intrest);
  }
  updateSkillsData() {
    const stepIndex = 10; // Adjust the step index if needed
    const skillsPayload = {
      objective: 'descriptopon',
      first_name: 'abhishiekpaul  ',
      last_name: 'paul',
      email: 'abhishiejoauk@Gmail.com',
      gender: 'male',
      phone: '+919347252317',
      job_title: 'front end devloper',
      birth_date: '09/10/2001',
      skills: this.enteredIntrest, // Your skills data
      interests: [],
      media: [123],
      stepIndex: stepIndex,
    };
  
  
  }
  
  // Adds a suggested skill to the entered skills list
  addSuggestedSkill(Intrest: string) {
    if (!this.enteredIntrest.includes(Intrest)) {
      this.enteredIntrest.push(Intrest);
    }
  }

}
