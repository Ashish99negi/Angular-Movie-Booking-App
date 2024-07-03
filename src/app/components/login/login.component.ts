import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = 'Ashish99user';
  password: string = 'negiAshish';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    const user = {
      username: this.username,
      password: this.password,
    };
    if (user) {
      this.authService.login(user);
    }
  }
}
