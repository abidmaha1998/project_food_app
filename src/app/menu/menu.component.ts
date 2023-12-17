import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public Auth: AuthService) {
    this.Auth.isLoggedIn() ? this.Auth.isLogged = true : this.Auth.isLogged = false;
  }

  ngOnInit(): void {
  }

  logout() {
    this.Auth.logout();
    return this.Auth.isLogged = false;
  }
}
