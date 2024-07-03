import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  username: string = 'Ashish99user';
  password: string = 'negiAshish';

  constructor(private router: Router) {
    this.loggedIn = !!localStorage.getItem('user');
  }

  login(user: any): void {
    if (user.username == this.username && user.password == this.password) {
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn = true;
      this.router.navigate(['/seat-selection']);
    } else {
      alert('Invalid credentials');
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
