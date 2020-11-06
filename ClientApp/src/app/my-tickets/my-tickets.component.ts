import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private ticketService: TicketService
  ) { }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    this.ticketService.getAllBy("paid", this.currentUser.id).subscribe(x => {this.ticketsPending = x})
    console.log(this.currentUser.id)
  }
  getTicketBy(x){
    this.ticketService.getAllBy(x, this.currentUser.id).subscribe(x => {
      this.ticketsPending = x
      console.log(this.ticketsPending)})
  }
  currentUser: User
  ticketsPending: any
}
