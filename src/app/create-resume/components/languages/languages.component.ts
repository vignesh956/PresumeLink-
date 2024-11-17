import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent  implements OnInit {
  languages: any[] = [
    { name: 'English', selectedOptions: [] },
    { name: 'Telugu', selectedOptions: [] },
    { name: 'Hindi', selectedOptions: [] }
  ];

  newLanguageName: string = ''; // Store new language name
  fluency: string = 'medium';

  constructor(private languageService: CreateResumeService) { }

  ngOnInit() {}

  // Add a new language to the list
  addLanguage() {
    const trimmedName = this.newLanguageName.trim();
    
    // Check if the language name is valid and not already in the list
    if (trimmedName && !this.languages.some(language => language.name.toLowerCase() === trimmedName.toLowerCase())) {
      this.languages.push({ name: trimmedName, selectedOptions: [] });
      this.newLanguageName = ''; // Clear input after adding
    }
  }

  // Toggle skills for each language based on user selection
  toggleOption(languageIndex: number, skill: string) {
    const selectedOptions = this.languages[languageIndex].selectedOptions;

    if (selectedOptions.includes(skill)) {
      // Remove skill if already selected
      this.languages[languageIndex].selectedOptions = selectedOptions.filter((s: string) => s !== skill);
    } else {
      // Add the skill to selected options
      this.languages[languageIndex].selectedOptions.push(skill);
    }
  }

  // Submit the selected languages and skills
  submitLanguages() {
    const payload = {
      enter_languages: this.languages.map(language => ({
        name: language.name,
        selectedOptions: language.selectedOptions
      })),
      languages_fluency: this.fluency,
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
  }}
