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
        private sharedService:SharedService,
        private ticketService: TicketService,

    ) {
        this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
        this.clickEventsubscription = this.sharedService.getClickEvent().subscribe({
          next: (v) =>{ 
            if(v == "bookTicket"){
              console.log(`observerA: ${v}`)
              this.getTicket()
            }
            
          }
        })
    }
  ngOnInit(): void {
    this.getTicket()
    
  }

  refreshTicket(){
    this.sharedService.sendClickEvent("cart")
  }

  clickEventsubscription:Subscription;
  ticketsPending: any

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

    getTicket(){
      this.ticketService.getAllBy(TicketStatus.Pending, this.currentUser.id).subscribe(x => {
      
        this.ticketsPending = x
        console.log(this.ticketsPending.length)
      
      })
    }
}
