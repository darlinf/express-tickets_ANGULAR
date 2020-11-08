import {
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  from
} from 'rxjs';
import { User } from '../_models';
import { TicketStatus } from '../_models/TicketStatus';
import { AuthenticationService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { TicketService } from '../_services/ticket.service';

declare const jsCalendar: any;


@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss']
})
export class BookTicketsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private ticketService: TicketService,
    private sharedService:SharedService,
    private el: ElementRef
  ) {
    this.authenticationService.currentUser.subscribe(x =>{ this.currentUser = x;});
  }

  
  
  ngOnInit() {
     this.renderDate()
     this.formCreate()
   }

   formCreate(){
    this.form = this.formBuilder.group({
      from: new FormControl({value: ''}, Validators.required),
      quantity: new FormControl({value: ''}, Validators.required),
      hour: new FormControl({value: ''}),
      date: new FormControl({value: ''}, Validators.required),
      code: new FormControl({value: '', disabled: true}, Validators.required),
      place: new FormControl({value: '',disabled: true}, Validators.required)
    });
    this.ticketCode = Math.round(Math.random() * 100000)
   }

  changeDisabled(toCondition, toChange) {
    if (this.form.controls[toCondition].value != "") {
      this.form.controls[toChange].enable()
    } else {
      this.form.controls[toChange].disable()
    }
  }

  onSubmit(e) {
    var day = parseInt(this.dateElect.day)
    var day2 = day<10 ? "0"+day : day
    var date = this.dateElect.year + "-" +
              this.month[this.dateElect.month] + "-" +
              day2 + "T" +
              e.hour + ":00"

    this.ticketService.create({
      "from":e.from,
      "place":e.place,
      "date": date,
      "status": TicketStatus.Pending,
      "userId": this.currentUser.id,
      "quantity": parseInt(e.quantity),
      "busId": 1,
      "code": this.ticketCode
    }).subscribe(x =>{ 
      this.formCreate()
      this.sharedService.sendClickEvent("bookTicket");
    }, error => console.error(error))


  }

  choiceHours(i: number) {
    if (this.day.today[0] <= i + 1)
      this.showHours = true
    console.log(this.day.today[0] == null)
  }

  renderDate() {
    var endDate = new Date(
      this.dt.getFullYear(),
      this.dt.getMonth() + 1,
      0
    ).getDate();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var mm2 = String(today.getMonth() + 2).padStart(2, '0');
    var yyyy = today.getFullYear();

    var j = 0
    for (let i = parseInt(dd); i < parseInt(dd) + 7; i++) {
      if (i <= endDate) {
        this.dates2.push({
          day: i,
          month: this.month["" + mm],
          year: yyyy
        })
      } else {
        j++
        this.dates2.push({
          day: j,
          month: this.month["" + mm2],
          year: yyyy
        })
      }
    }
    
  }

  removeStyles(){
    let myTag = this.el.nativeElement.querySelector(".remove-style")
    console.log(myTag)
    myTag.classList.remove('show')
  }




  
  currentUser: User;
  ticketCode = Math.round(Math.random() * 100000)
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  sites = ["Bani", "San Cristóbal", "Santo Domingo", "Puerto Plata", "Santiago", "La Vega", "Higüey", "Samaná", "La Romana"]
  showHours = false
  dt = new Date()
  isLast = false
  dateElect = null
  isAllValid = false
  day = {
    prev_date: [],
    today: [],
    days: []
  }
  moveDateNo = true
  dates2 = []
  month = {
    "1": "Enero",
    "2": "Febrero",
    "3": "Marzo",
    "4": "Abril",
    "5": "Mayo",
    "6": "Junio",
    "7": "Julio",
    "8": "Agosto",
    "9": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",

    "Enero": "01",
    "Febrero": "02",
    "Marzo": "03",
    "Abril": "04",
    "Mayo": "05",
    "Junio": "06",
    "Julio": "07",
    "Agosto": "08",
    "Septiembre": "09",
    "Octubre": "10",
    "Noviembre": "11",
    "Diciembre": "12",
  }
}



