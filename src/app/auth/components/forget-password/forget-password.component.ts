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
  showForgetPassword:any=true
  forgotPasswordForm!: FormGroup;
  showResetPassword:any=false;
  resetPasswordForm: FormGroup;
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';
  phoneNumber: string = '';
  constructor(private router:Router,private service:AuthService,private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]  // Email required and must be valid
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
   }
   onSubmit() {
    if (this.resetPasswordForm.valid) {
      // Get the email from the AuthService
      const email = this.forgotPasswordForm.value.email; // Retrieve the stored email
      const { newPassword } = this.resetPasswordForm.value;
  
      // Call the resetPassword method from the AuthService
      this.service.resetPassword(email, newPassword).subscribe(
        response => {
          console.log('Password reset successful:', response);
          // Navigate to login or success page
          this.router.navigate(['home']); // Adjust the route as needed
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
    // Check if the form is valid before submitting
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      const phone = "+919347252317";

      console.log('Email:', email);  // Debugging email value
      console.log('Phone:', phone);  // Debugging phone value

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
      console.log('Form Errors:', this.forgotPasswordForm.errors);  // Debug form errors
    }
  
  }
  verifyOtp() {
   
    const enteredOtp = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}${this.otp5}${this.otp6}`;

    if (enteredOtp.length !== 6) {
      alert('OTP must be 6 digits.');
      return;
    }

    this.service.verifyPhoneNumberWithOtp(enteredOtp).subscribe(
      (response: any) => {
        console.log('OTP verified successfully:', response);
        this.router.navigate(['dashboard']); 
        this.showForgetPassword=true;
        this.showForgetPassword=false;
        this.showVerificationEmail=false 
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
