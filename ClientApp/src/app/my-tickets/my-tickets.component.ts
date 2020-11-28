import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
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
    private ticketService: TicketService,
    private el: ElementRef
  ) { }


  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    this.getTicketBy(TicketStatus.Paid)

    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe({
      next: (v) => {
        if(v == "paidTicket"){
          this.getTicketBy(TicketStatus.Paid)
        }
      }
    })
  }

  closeWindow(){
    let myTag = this.el.nativeElement.querySelector(".close-window")
    myTag.classList.remove('show')
  }

  refund(){
    this.ticket.status = TicketStatus.Refund
    this.ticketService.edit(this.ticket).subscribe(x => {
      this.showSwitch = false
      this.getTicketBy(TicketStatus.Paid)
    }, e => console.log(e))
  }

  refundDecition(ticket){
    this.ticket = ticket
    this.showSwitch = true
    this.ticketForDelete = ticket.code
  }

  scrollViewQr(id){
    var elmnt = document.getElementById("content"+id);
    elmnt.scrollIntoView();
  }
  loading = true
  ticket: any
  ticketForDelete: any
  showSwitch = false


  getTicketBy(x){
    this.loading = false
    this.ticketService.getAllBy(x, this.currentUser.id).subscribe(x => {
      this.ticketsPending = x
      this.bagNumber = x.length
      this.onBagNumber2.emit(this.bagNumber);
      this.loading = true
    }, e =>{
      this.loading = true
      console.log(e)
    } )
  }

  bagNumber = 0
  currentUser: User
  ticketsPending: any
  clickEventsubscription:Subscription;
  @Output() onBagNumber2: EventEmitter<any> = new EventEmitter<any>();


}
