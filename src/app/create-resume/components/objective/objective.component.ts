import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
})
export class ObjectiveComponent implements OnInit {
submitted = false;
  displayedText: string = ''; 
  charCount: number = 0; 
  clickedParagraphIndex: number | null = null; 

  summary: Array<{ description: string }> = [
    { description: 'Accessibility-focused web designer with 10 years of experience crafting user interfaces that are inclusive and meet WCAG guidelines.' },
    { description: 'Web developer with expertise in building responsive websites and web applications.' },
    { description: 'Mobile app developer specializing in creating native and cross-platform mobile apps.' },
    { description: 'Full-stack developer with a focus on creating scalable backend services and front-end interfaces.' }
  ];

  copyform!: FormGroup;

  constructor(public fb: FormBuilder, public copyservice: CreateResumeService) {
    this.copyform = this.fb.group({
      summary: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]]
    });
  }

  get validationCheck() {
    return this.copyform.controls;
  }

  ngOnInit() {}

  updateCharCount() {
    const value = this.copyform.get('summary')?.value || '';
    this.charCount = value.length;
  }

  copyTextToInput(description: string, index: number) {
    this.displayedText = description;
    this.copyform.patchValue({ summary: this.displayedText });
    this.updateCharCount();
    this.clickedParagraphIndex = index; 
    console.log(this.clickedParagraphIndex)
    setTimeout(() => {
      this.clickedParagraphIndex = null;
    }, 1000);
  }

  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    console.log(this.clickedParagraphIndex)

    if (clipboardData) {
      const pastedData = clipboardData.getData('text');
      const currentValue = this.copyform.get('summary')?.value || '';
      const newValue = currentValue + pastedData;

      if (newValue.length > 400) {
        event.preventDefault();
      } else {
        this.copyform.patchValue({ summary: newValue });
        this.updateCharCount();
      }
    } else {
      console.error('Clipboard data is not available.');
    }
  }

 
}
