import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

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
  constructor(private objectiveService:CreateResumeService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  objectiveData: any = {
    examples: [],
    objective_description: '',
    stepIndex: 3,
  };


  

  updateDisplayedText(event: MouseEvent, paragraphId: string) {
    const target = event.currentTarget as HTMLElement;
    const textContent = target.querySelector('ion-text')?.innerText || '';

    this.displayedText = textContent;
    this.clickedParagraphId = paragraphId;
    this.showCopyText = paragraphId;
    setTimeout(() => {
      this.showCopyText = '';
    }, 200000);
    this.sendObjectiveToAPI(textContent)
  }

  sendObjectiveToAPI(objectiveContent: string) {
    const objectiveData = {
      objective: objectiveContent, // Only send the objective content
    };
    this.objectiveService.submitObjectiveDetails( objectiveData).subscribe(
      (response) => {
        console.log('Data updated successfully:', response);
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
  }
}
