import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss'],
})
export class EmployeeLoginComponent  implements OnInit {
  showOtp: any = false;
  showLogin: any = true;
  phoneForm!: FormGroup;
  emailForm!: FormGroup;
  otp: string = '';      
    isOtpValid: boolean = false;
  errorMessage: string = '';
  showPhoneComponent: any = true;
  showEmailComponent: any = false;
  selectedSegment: any = 'custom';
  phoneImage: string = 'assets/icon/icon_private_tours_phone.png';
  emailImage1: string = 'assets/icon/icon_private_tours_email1.png';
  emailImage2: string = 'assets/icon/icon_private_tours_email2.png';
  socialAuthService: any;

  otpConfig = {
    length: 6,
    inputClass: 'otp-box',
    allowNumbersOnly: true,
    disableAutoFocus: false
  };
  constructor(public router: Router, private fb: FormBuilder, private service: AuthService) { }

  ngOnInit() {


    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // otp: ['', [Validators.required]] // Added OTP field for email verification
    });
    this.emailForm.patchValue({
      email: this.service.getEmail(),
    });
    this.phoneForm = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
    });
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
    if (this.selectedSegment === 'custom') {
      this.PhoneComponent();
    } else {
      this.EmailComponent();
    }
  }

  PhoneComponent() {
    this.showPhoneComponent = true;
    this.showEmailComponent = false;
  }

  EmailComponent() {
    this.showEmailComponent = true;
    this.showPhoneComponent = false;
  }

  otpcomponent() { }

  emailVarification() {
    this.router.navigate(["Email-varification"]);
  }

  CreateAccount() {
    this.router.navigate(["login/create-account"]);
  }

  forgotPassword() {
    this.router.navigate(["Forgot-password"]);
  }

  onSendOtp() {
    this.showOtp = true;
    this.showLogin = false
    if (this.phoneForm.valid) {
      let phoneNumber = this.phoneForm.value.phone;
      let password = "pasword";
      if (!phoneNumber.startsWith('+91')) {
        phoneNumber = `+91${phoneNumber}`;
      }
      this.service.sendOtp({ phone: phoneNumber, password: password }).subscribe(
        (response: any) => {
          console.log('OTP sent successfully:', response);
          alert('OTP sent to your phone number.');
          this.router.navigate(["otp-component"])
        },
        (error: any) => {
          console.error('Error sending OTP:', error);

          if (error.error && error.error.message) {
            alert(error.error.message[0]);
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      );
    } else {

      alert('Please enter a valid phone number and password.');
    }
  }

  emailVerification() {
    if (this.emailForm.valid) {
      const { email, password } = this.emailForm.value;


      this.service.verifyEmail(email, password).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('userData', JSON.stringify(response.result));
          this.router.navigate(['dashboard']);
        },
        (error: any) => {
          console.error('Error during login:', error);
          alert('Login failed. Please check your email and password.');
        }
      );
    } else {
      console.log('Email form is invalid');
    }
  }


  validatePhoneNumber(control: any) {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }


  onOtpChange(otp: string): void {
    console.log('OTP Entered:', otp);
    this.otp = otp;
  }

  verifyOtp() {

    const enteredOtp = this.otp;

    if (enteredOtp.length !== 6) {
      alert('OTP must be 6 digits.');
      return;
    }


    this.service.verifyPhoneNumberWithOtp(enteredOtp).subscribe(
      (response: any) => {
        console.log('OTP verified successfully:', response);
        this.router.navigate(['dashboard']);

      },
      (error: any) => {
        console.error('Error verifying OTP:', error);
        if (error.status === 401) {
          alert('Invalid OTP. Please try again.');
        } else if (error.status === 400) {
          alert('Invalid phone number format.');
        } else if (error.status === 429) {
          alert('Too many attempts. Please wait and try again.');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }


 
}
