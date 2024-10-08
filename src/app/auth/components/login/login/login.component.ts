import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  pageLoads:any=true;
  constructor( private router: Router) { }

  ngOnInit() {}
  loginAsEmployee() {
    
    this.router.navigate(['/login/employee']); 
    this.pageLoads=false;
    console.log('Logging in as Employee');
    
  }
}
