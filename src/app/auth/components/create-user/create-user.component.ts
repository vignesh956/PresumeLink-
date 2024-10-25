import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent  implements OnInit {
  createAccountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPassword.bind(this)]],
    });
  }

  matchPassword(control: any) {
    const password = this.createAccountForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      const { email, password } = this.createAccountForm.value;

      // Call the API to create an account
      this.service.createAccount(email, password).subscribe(
        (response:any) => {
          console.log('Account created successfully:', response);
          this.router.navigate(['login']);
        },
        (error:any) => {
          console.error('Error creating account:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  showPhonecomponent() {
    this.router.navigate(["auth/login"]);
  }  
}
