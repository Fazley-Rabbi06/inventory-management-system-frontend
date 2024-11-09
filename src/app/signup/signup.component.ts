import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = { name: '', email: '', password: '', roles: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSignup() {
    if (!this.user.name || !this.user.email || !this.user.password || !this.user.roles) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.authService.signup(this.user).subscribe(
      response => {
        alert('User created successfully');
        this.authService.login({ username: this.user.name, password: this.user.password }).subscribe();
      },
      error => {
        this.errorMessage = 'Signup failed. Please try again.';
      }
    );
  }
}
