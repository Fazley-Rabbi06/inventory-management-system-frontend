import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log('Login successful:', response);
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
