import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Role } from '../_models';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  

  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    }
    get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }
    get isUser() {
      return this.currentUser && this.currentUser.role === Role.User;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}
