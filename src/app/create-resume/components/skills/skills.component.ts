import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent  implements OnInit {

  constructor(public skillsService:CreateResumeService) { }

  ngOnInit() {}
  enteredSkills: string[] = []; // Array to store user-entered skills
  suggestedSkills: string[] = ['Prototyping', 'User Research', 'Visual Design', 'Information Architecture']; // Suggested skills array
  newSkill: string = ''; // Temporary variable to store new skill input

  // Adds a new skill from input
  addSkill() {
    console.log("kjhkcgvjhkjbv")
    if (this.newSkill && !this.enteredSkills.includes(this.newSkill)) {
      this.enteredSkills.push(this.newSkill);
      this.newSkill = ''; // Clear input after adding
    }
   
  }
  

  // Removes a skill from the entered skills list
  removeSkill(skill: string) {
    this.enteredSkills = this.enteredSkills.filter(s => s !== skill);
  }
  updateSkillsData() {
    const stepIndex = 10; // Adjust the step index if needed
    const skillsPayload = {
     
    
      skills: this.enteredSkills, // Your skills data
     
      media: [123],
      stepIndex: stepIndex,
    };
  
    // Use the PATCH method from the service
    this.skillsService.updateSkillsData(skillsPayload)
      .subscribe(
        response => {
          console.log('Data updated successfully using PATCH:', response);
        },
        error => {
          console.error('Error updating data using PATCH:', error);
        }
      );
  }
  
  // Adds a suggested skill to the entered skills list
  addSuggestedSkill(skill: string) {
    if (!this.enteredSkills.includes(skill)) {
      this.enteredSkills.push(skill);
    }
  }
}
