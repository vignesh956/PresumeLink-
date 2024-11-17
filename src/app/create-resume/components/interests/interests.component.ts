import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
})
export class InterestsComponent  implements OnInit {
  enteredInterest: string[] = []; 
  suggestedInterest: string[] = ['Music', 'Painting', 'Travelling', 'User Experience', 'User Research'];
  newInterest: string = ''; // Variable to store new interest input

  constructor(public interestService: CreateResumeService) {}

  ngOnInit() {}

  // Adds a new interest from input
  addInterest() {
    if (this.newInterest && !this.enteredInterest.includes(this.newInterest)) {
      this.enteredInterest.push(this.newInterest);
      this.newInterest = ''; // Clear input after adding
    }
  }

  // Removes an interest from the entered interests list
  removeInterest(interest: string) {
    this.enteredInterest = this.enteredInterest.filter(i => i !== interest);
  }

  // Submits the updated interests to the backend API
  updateInterestData() {
    const interestPayload = {
     
     
      
      interests:this.enteredInterest, // Adjust this if you want to include additional interests
      media: [123],
      stepIndex: 10,
    };

    console.log('Payload to send:', interestPayload);

    this.interestService.updateInterestData(interestPayload)
      .subscribe(
        response => {
          console.log('Data updated successfully:', response);
        },
        error => {
          console.error('Error updating data:', error);
        }
      );
  }

  // Adds a suggested interest to the entered interests list
  addSuggestedInterest(interest: string) {
    if (!this.enteredInterest.includes(interest)) {
      this.enteredInterest.push(interest);
    }
  }}
