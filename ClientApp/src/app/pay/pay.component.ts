import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
       // transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter',[
        animate(300, style({
          //transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class PayComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private ticketService: TicketService,
    private sharedService:SharedService,
    private router: Router,
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
    this.loading = true
    this.ticketsPending.forEach( x => {
      x.status = TicketStatus.Paid
    })
    this.ticketService.editList(this.ticketsPending).subscribe(x => {
      this.sharedService.sendClickEvent("paidTicket");
      this.router.navigate(['/facturacion']);
      this.loading = false
    }, e => {
      console.error(e)
      this.loading = false
    })
  }

  loading = false;
  total = 0
  currentUser: User
  ticketsPending: any
  clickEventsubscription:Subscription;
}
