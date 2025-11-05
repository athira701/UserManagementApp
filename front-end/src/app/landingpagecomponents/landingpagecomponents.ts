import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpagecomponents',
  imports: [],
  templateUrl: './landingpagecomponents.html',
  styleUrl: './landingpagecomponents.css'
})
export class LandingPageComponent {

  constructor(private router: Router){}

  onUserSubmit(){
    this.router.navigateByUrl('/login')
  }

  onAdminSubmit(){
    this.router.navigateByUrl('/admin/login')
  }

}
