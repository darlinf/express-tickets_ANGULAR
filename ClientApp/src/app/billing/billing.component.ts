import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TicketService } from '../_services/ticket.service';
import { AuthenticationService } from '../_services';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
       // transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter',[
        animate(600, style({
          //transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class BillingComponent implements OnInit {

  constructor(
    private ticketService: TicketService,
    private authenticationService: AuthenticationService
  ) { }
  

  ngOnInit() {
    this.ticketService.sendMail(this.mail).subscribe(x => {}, e => console.log(e))
  }
  mail = { 
    EmailDestination:this.authenticationService.currentUserValue.mail,
    Body: `<div class="invoice-box" style="max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;">
    <table cellpadding="0" cellspacing="0" style="width: 100%;line-height: inherit;text-align: left;">
        <tr class="top">
            <td colspan="2" style="padding: 5px;vertical-align: top;">
                <table style="width: 100%;line-height: inherit;text-align: left;">
                    <tr>
                        <td class="title" style="padding: 5px;vertical-align: top;padding-bottom: 20px;font-size: 45px;line-height: 45px;color: #333;">
                            <img src="https://contents.smsupermalls.com/data/uploads/2020/07/SPI_TICKET_EXPRESS.png" style="width:100%; max-width:300px;">
                        </td>
                        
                        <td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 20px;">
                            Fatura #: 123<br>
                            Creado: January 1, 2015<br>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr class="information">
            <td colspan="2" style="padding: 5px;vertical-align: top;">
                <table style="width: 100%;line-height: inherit;text-align: left;">
                    <tr>
                        <td style="padding: 5px;vertical-align: top;padding-bottom: 40px;">
                            Ticket Express, Inc.<br>
                            12345 Sunny Road<br>
                            Sunnyville, TX 12345
                        </td>
                        
                        <td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 40px;">
                            Acme Corp.<br>
                            John Doe<br>
                            john@example.com
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr class="heading">
            <td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                Metodo de pago
            </td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                Paypal #
            </td>
        </tr>
        
        <tr class="details">
            <td style="padding: 5px;vertical-align: top;padding-bottom: 20px;">
                Paypal
            </td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 20px;">
                1000
            </td>
        </tr>
        
        <tr class="heading">
            <td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                Articulos
            </td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                Precio
            </td>
        </tr>
        
        <tr class="item">
            <td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">
                Ticket codigo <b>#28665</b>
            </td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;border-bottom: 1px solid #eee;">
                $300.00
            </td>
        </tr>
        
        <tr class="item">
            <td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">
                Ticket codigo <b>#82623</b>
            </td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;border-bottom: 1px solid #eee;">
                $175.00
            </td>
        </tr>
        
        <tr class="item last">
            <td style="padding: 5px;vertical-align: top;border-bottom: none;">
                Ticket codigo <b>#58263</b>
            </td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;border-bottom: none;">
                $175.00
            </td>
        </tr>
        
        <tr class="total">
            <td style="padding: 5px;vertical-align: top;"></td>
            
            <td style="padding: 5px;vertical-align: top;text-align: right;border-top: 2px solid #eee;font-weight: bold;">
               Total: $650.00
            </td>
        </tr>
    </table>
</div>`};
}
