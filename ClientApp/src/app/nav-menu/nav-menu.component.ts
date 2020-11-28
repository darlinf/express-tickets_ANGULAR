import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, Role } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{
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
        private authenticationService: AuthenticationService,
    ) {
        this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
        
    }
  ngOnInit(): void {
    
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

    bagNum2=0
    public bagNumber2(num) {
      this.bagNum2 = num
      this.loading2 = true
    }

    bagNum=0
    public bagNumber(num) {
      this.bagNum = num
      this.loading = true
    }

    loading = false
    loading2 = false
}
