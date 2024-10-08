import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent  implements OnInit {

  profileForm!: FormGroup;
  symbolImage1: string = 'assets/icon/Group 1000010326.png'; 
  symbolImage2: string = 'assets/icon/Group 1000010326.png';
  symbolImage3: string = 'assets/icon/Group 1000010326.png';
  showInput1: boolean = false;
  showInput2: boolean = false;
  showInput3: boolean = false;
  birthDate: string = '';
  selectedGender: string = '';

  selectGender(gender: string) {
    this.selectedGender = gender;
  }
    
  constructor(private fb: FormBuilder, ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      location: ['', Validators.required],
      jobTitles: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  onInputBlur(event: any) {
    const inputValue = event.target.value;
    if (!inputValue) {
      console.log('Input exited without typing.');
    }
  }
  


  toggleSymbol(buttonNumber: number) {
    switch (buttonNumber) {
      case 1:
        this.showInput1 = !this.showInput1;
        this.symbolImage1 = this.showInput1 ? 'assets/icon/worng symbol.png' : 'assets/icon/Group 1000010326.png';
        break;
      case 2:
        this.showInput2 = !this.showInput2;
        this.symbolImage2 = this.showInput2 ? 'assets/icon/worng symbol.png' : 'assets/icon/Group 1000010326.png';
        break;
      case 3:
        this.showInput3 = !this.showInput3;
        this.symbolImage3 = this.showInput3 ? 'assets/icon/worng symbol.png' : 'assets/icon/Group 1000010326.png';
        break;
      default:
        break;
    }
  }
  getButtonClass(buttonNumber: number): string {
    switch (buttonNumber) {
      case 1:
        return this.showInput1 ? 'blue-background' : 'white-background';
      case 2:
        return this.showInput2 ? 'blue-background' : 'white-background';
      case 3:
        return this.showInput3 ? 'blue-background' : 'white-background';
      default:
        return 'white-background';
    }
  }

}
