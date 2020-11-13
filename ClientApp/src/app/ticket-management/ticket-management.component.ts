import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TicketManagementServiceService } from '../_services/ticket-management-service.service';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        //transform: 'translateX(-100%)',
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
export class TicketManagementComponent implements OnInit {

  constructor(
    private ticketManagementService: TicketManagementServiceService
  ) { }
   
  ngOnInit() {
  }

  error: string
  loading = false
  success: string
  redeemTicketCode: string

  redeemTicket(){
    this.loading = true
    this.ticketManagementService.redeemTicket(this.redeemTicketCode).subscribe(x => {
      this.loading = false
      this.success = "Ticket canjedo"
      setTimeout(()=>this.success = null, 3000)
    }, error =>{ 
      this.loading = false
      this.error=error.error.message
      console.error(error)
      setTimeout(()=>this.error = null, 3000)
    })
  }

  loading2 = false
  changeUserRolMail: string
  ChangeUserRol(){
    this.loading2 = true
    this.ticketManagementService.changeUserRol(this.changeUserRolMail).subscribe(x => {
      this.loading2 = false
      this.success = "Rol de usuario cambiado"
      setTimeout(()=>this.success = null, 3000)
    }, error =>{ 
      this.loading2 = false
      this.error=error.error.message
      console.error(error)
      setTimeout(()=>this.error = null, 3000)
    })    
  }

  cancelBusCode: string
  loading3 = false
  CancelBus(){
    this.loading3 = true
    this.ticketManagementService.cancelBus(this.cancelBusCode).subscribe(x => {
      this.loading3 = false
      this.success = "Bus cancelado"
      setTimeout(()=>this.success = null, 3000)
    }, error =>{ 
      this.loading3 = false
      this.error=error.error.message
      console.error(error)
      setTimeout(()=>this.error = null, 3000)
    })
  }
}
