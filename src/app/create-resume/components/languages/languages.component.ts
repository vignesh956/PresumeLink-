import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent  implements OnInit {

  constructor( private languageService:CreateResumeService) { }

  ngOnInit() {}
  languages: any[] = [
    { name: 'English', selectedOptions: [] },
    { name: 'Telugu', selectedOptions: [] },
    { name: 'Hindi', selectedOptions: [] }
  ];

fluency: string = 'medium'
  toggleOption(languageIndex: number, option: number) {
    const selectedOptions = this.languages[languageIndex].selectedOptions;
    if (selectedOptions.includes(option)) {
      this.languages[languageIndex].selectedOptions = selectedOptions.filter((o: any) => o !== option);
    } else {
      this.languages[languageIndex].selectedOptions.push(option);
    }
  }

  submitLanguages() {
    const payload = {
      enter_languages: this.languages.map(language => ({
        name: language.name,
        selectedOptions: language.selectedOptions
      })),
      languages_fluency: this.fluency,  // Corrected to "languages_fluency"
      stepIndex: 9
    };
  
    this.languageService.submitLanguages(payload).subscribe(
      response => {
        console.log('Languages submitted successfully', response);
      },
      error => {
        console.error('Error submitting languages', error);
      }
    );
  }
}
