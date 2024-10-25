import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent  implements OnInit {
  showVerificationEmail:any=false;
  Emailotp:any="";
  showForgetPassword:any=true
  forgotPasswordForm!: FormGroup;
  showResetPassword:any=false;
  resetPasswordForm: FormGroup;
  
  phoneNumber: string = '';
  otpConfig = {
    length: 6,                   
    inputClass: 'otp-box',       
    allowNumbersOnly: true,      
    disableAutoFocus: false       
  };
  onOtpChange(event: any): void {
    const otp = event?.detail || ''; // Adjust based on actual event structure
    console.log('OTP:', otp); // Debugging output
    this.Emailotp = otp; // Store the OTP value in the component's state
}

  constructor(private router:Router,private service:AuthService,private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]  
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
   }
   onSubmit() {
    if (this.resetPasswordForm.valid) {
          const email = this.forgotPasswordForm.value.email; 
      const { newPassword } = this.resetPasswordForm.value;
  
      
      this.service.resetPassword(email, newPassword).subscribe(
        response => {
          console.log('Password reset successful:', response);
          
          this.router.navigate(['home']); 
        },
        error => {
          console.error('Error resetting password:', error);
          alert('Failed to reset password. Please try again.');
        }
      );
    } else {
      console.error('Form is invalid');
      alert('Please fill in all fields correctly.');
    }
  }
  
  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  ngOnInit() {
    this.phoneNumber = this.service.getPhoneNumber();
  }
  forgotPassword() {
    
    this.showVerificationEmail=true;
    this.showForgetPassword=false;
    
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      const phone = "+919618549530";

      console.log('Email:', email);  
      console.log('Phone:', phone);  

      this.service.sendEmailOtp(email, phone).subscribe(
        response => {
          console.log('OTP sent successfully:', response);
        },
        error => {
          console.error('Error sending OTP:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      console.log('Form Errors:', this.forgotPasswordForm.errors);  
    }
  
  }
  verifyOtp() {

    const enteredOtp = this.Emailotp;

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
