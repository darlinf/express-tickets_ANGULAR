import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
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
    private sharedService:SharedService,
    private el: ElementRef

  ) { 
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe({
      
      next: (v) => {
        if(v == "bookTicket"){
          this.getTicket()
          console.log(`observerA: ${v}`)
        }
      }
    })
  }
  

  ngOnInit() {
    
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
    this.getTicket()
  }

  getTicket(){
    this.ticketService.getAllBy(TicketStatus.Pending, this.currentUser.id).subscribe(x => {
      this.ticketsPending = x

        this.bagNumber = x.length
        console.log(this.bagNumber)
     
      this.onBagNumber.emit(this.bagNumber);
    })
  }

  closeWindow(){
    let myTag = this.el.nativeElement.querySelector(".close-window")
    console.log(myTag)
    myTag.classList.remove('show')
  }
  
  delete(){
    this.ticketService.delete(this.ticket.id).subscribe(x => {
      this.getTicket()
      this.showSwitch = false
    })
  }

  deleteDecition(ticket){
    this.ticket = ticket
    this.showSwitch = true
    this.ticketForDelete = ticket.code
  }

  ticket: any
  ticketForDelete: any
  showSwitch = false
  bagNumber = 0

  currentUser: User
  ticketsPending: any
  clickEventsubscription:Subscription;
  @Output() onBagNumber: EventEmitter<any> = new EventEmitter<any>();
}
