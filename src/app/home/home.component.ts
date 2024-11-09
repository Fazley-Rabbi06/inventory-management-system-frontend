import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.username = localStorage.getItem('username') || 'User'; // Get the username from localStorage
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
