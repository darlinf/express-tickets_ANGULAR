import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private ticketService: TicketService,
    private sharedService:SharedService
  ) { 
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe({
      
      next: (v) => {
        if(v == "cart"){
          this.getTicket()
          console.log(`observerA: ${v}`)
        }
      }
    })
  }
  
  delete(x){
    this.ticketService.delete(x).subscribe(x => {
      this.getTicket()
    })
  }

  ngOnInit() {
    
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    this.getTicket()
  }

  getTicket(){
    this.ticketService.getAllBy(TicketStatus.Pending, this.currentUser.id).subscribe(x => {
      this.ticketsPending = x
    })
  }
  currentUser: User
  ticketsPending: any
  clickEventsubscription:Subscription;
}
