import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private ticketService: TicketService,
    private sharedService:SharedService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    this.getTicket()
  }
  getTicket(){
    this.ticketService.getAllBy(TicketStatus.Pending, this.currentUser.id).subscribe(x => {
      this.ticketsPending = x
      
      x.forEach(element => {
        this.total += element.quantity*250
      });
    })
  }

  pay(){
    this.ticketsPending.forEach( x => {
      x.status = TicketStatus.Paid
    })
    this.ticketService.editList(this.ticketsPending).subscribe(x => {
      console.log("eee")
      this.sharedService.sendClickEvent("paidTicket");
    }, e => console.error(e))
  }

  total = 0
  currentUser: User
  ticketsPending: any
  clickEventsubscription:Subscription;
}
