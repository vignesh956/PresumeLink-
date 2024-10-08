import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  languages: any[] = [
    { name: 'English', selectedOptions: [] },
    { name: 'Telugu', selectedOptions: [] },
    { name: 'Hindi', selectedOptions: [] }
  ];



  toggleOption(languageIndex: number, option: number) {
    const selectedOptions = this.languages[languageIndex].selectedOptions;

    if (selectedOptions.includes(option)) {
      // If the option is already selected, remove it from the array (deselect)
      this.languages[languageIndex].selectedOptions = selectedOptions.filter((o:any) => o !== option);
    } else {
      // Otherwise, add the option to the array (select it)
      this.languages[languageIndex].selectedOptions.push(option);
    }
  }
}
