import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
})
export class ObjectiveComponent  implements OnInit {

 


  displayedText: string = ''; 
  clickedParagraphId: string = '';
  backgroundColor: string = ' var(--Blue, #053750)';
  showCopyText: string = ''; 
  objectiveId: string = '12345'; 
  employeeId = '66fe8b162ffe0aaf9d6f663a';
  constructor() { }
  objectiveData: any = {
    examples: [],
    objective_description: '',
    stepIndex: 3,
  };


  ngOnInit() {}

  updateDisplayedText(event: MouseEvent, paragraphId: string) {
    const target = event.currentTarget as HTMLElement;
    const textContent = target.querySelector('ion-text')?.innerText || '';

    this.displayedText = textContent;
    this.clickedParagraphId = paragraphId;
    this.showCopyText = paragraphId;
    const token = 'your-auth-token'; // Replace with your logic to get the token

    // this.serice.updateObjectiveData(this.employeeId, this.objectiveData, token).subscribe(
    //   (response) => {
    //     console.log('Data updated successfully:', response);
    //   },
    //   (error) => {
    //     console.error('Error updating data:', error);
    //   }
    // );
    setTimeout(() => {
      this.showCopyText = '';
    }, 200000);
  }
}
