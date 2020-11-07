import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private sharedService:SharedService,
    private ticketService: TicketService
  ) { }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    this.getTicketBy(TicketStatus.Paid)

    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe({
      next: (v) => {
        if(v == "paidTicket"){
          this.getTicketBy(TicketStatus.Paid)
          console.log(`observerA: ${v}`)
          
        }
      }
    })
  }

  refund(ticket){
    ticket.status = TicketStatus.Refund
    this.ticketService.edit(ticket).subscribe(x => {
      console.log("dddd")
      this.getTicketBy(TicketStatus.Paid)
    }, e => console.log(e))
  }
  

  getTicketBy(x){
    this.ticketService.getAllBy(x, this.currentUser.id).subscribe(x => {
      this.ticketsPending = x
      console.log(this.ticketsPending)
      this.bagNumber = x.length
      console.log(this.bagNumber)
      this.onBagNumber2.emit(this.bagNumber);
    })
  }

  bagNumber = 0
  currentUser: User
  ticketsPending: any
  clickEventsubscription:Subscription;
  @Output() onBagNumber2: EventEmitter<any> = new EventEmitter<any>();


}
