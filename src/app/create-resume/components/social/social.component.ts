import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent   {
  linkedin: string = '';
  behance: string = '';
  dribble: string = '';

  // Social media options for buttons
  socialMedia: string[] = ['GitHub', 'Twitter', 'Instagram'];
  addLinks: { platform: string; url: string }[] = [];

  constructor(private interestsService: CreateResumeService) {}

  ngOnInit() {}

  // Function to add a link to the addLinks array
  addLink(platform: string) {
    if (platform && !this.addLinks.some((link) => link.platform === platform)) {
      this.addLinks.push({ platform, url: '' });
    }
  }

  // Function to check if any of the mandatory fields are empty
  isFormValid() {
    return this.linkedin || this.behance || this.dribble || this.addLinks.some((link) => link.url);
  }

  // Submits the form data to the backend API
  submitData() {
    // Only send data if there's at least one valid input
    if (!this.isFormValid()) {
      console.warn('No valid data to submit.');
      return;
    }

    const payload = {
      linkedin: this.linkedin || null,
      behance: this.behance || null,
      dribble: this.dribble || null,
      add_links: this.addLinks.filter((link) => link.url), // Only include valid URLs
      stepIndex: 10,
    };

    console.log('Payload to send:', payload);

    // Call the service to submit the data
    this.interestsService.submitSocialData(payload).subscribe(
      (response) => {
        console.log('API Response:', response);
        // Handle success (e.g., show a success message or navigate)
      },
      (error) => {
        console.error('API Error:', error);
        // Handle error (e.g., show an error message)
      }
    );
  }}
