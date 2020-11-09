import { Component, OnInit } from '@angular/core';
import { TicketManagementServiceService } from '../_services/ticket-management-service.service';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  constructor(
    private ticketManagementService: TicketManagementServiceService
  ) { }
   
  ngOnInit() {
  }

  redeemTicketCode: number

  redeemTicket(){console.log(this.redeemTicketCode)
    //this.ticketManagementService.redeemTicket(2).subscribe(x => {}, error => console.log(error))
  }
}
