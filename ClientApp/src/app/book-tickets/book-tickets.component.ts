import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

declare const jsCalendar : any;


@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss'] 
})
export class BookTicketsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.renderDate();
    this.form = this.formBuilder.group({
      /*from: ['', Validators.required],
      place: ['', Validators.required]*/

      from: new FormControl({value: ''}, Validators.required),
      place: new FormControl({value: '', disabled: true}, Validators.required),
      quantity: new FormControl({value: '', disabled: true}, Validators.required),
      hour: new FormControl({value: ''}, Validators.required),
  });
   }

   form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

   sites = [ "Bani", "San Cristóbal","Santo Domingo", "Puerto Plata", "Santiago", "La Vega", "Higüey", "Samaná", "La Romana"]
  
  /* form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });*/

  showHours = false
  dt = new Date()


  changeDisabled(toCondition, toChange){
    if(this.form.controls[toCondition].value != ""){
      this.form.controls[toChange].enable()
    }else{
      this.form.controls[toChange].disable()
    }
  }

  onSubmit(){
  
  }

  choiceHours(i: number){
    if(this.day.today[0] <= i+1)
    this.showHours = true
    console.log(this.day.today[0] == null)
  }

  isLast = false
  
     renderDate() {
      this.dt.setDate(1);
        var day = this.dt.getDay();
        var today = new Date();
        var endDate = new Date(
          this.dt.getFullYear(),
          this.dt.getMonth() + 1,
            0
        ).getDate();

        var prevDate = new Date(
          this.dt.getFullYear(),
          this.dt.getMonth(),
            0
        ).getDate();
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        document.getElementById("month").innerHTML = months[this.dt.getMonth()];
        document.getElementById("date_str").innerHTML = this.dt.toDateString();
        var cells = "";

        for (var x = day; x > 0; x--) {
            cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
            this.day.prev_date.push(prevDate - x + 1)
        }
        for (var i = 1; i <= endDate; i++) {
            if (i == today.getDate() && this.dt.getMonth() == today.getMonth()){
              cells += "<div class='today'>" + i + "</div>";
              this.day.days.push(i)
              this.day.today.push(i)
            }else{
              cells += "<div>" + i + "</div>";
              this.day.days.push(i)
            }
        }

        //document.getElementsByClassName("days")[0].innerHTML = cells;
    }

    day = {
      prev_date: [],
      today: [],
      days: []
    }

    moveDateNo = true

     moveDate(para) {
       this.day.prev_date = []
       this.day.today = []
       this.day.days = []
        if(para == "prev" && this.moveDateNo == false) {this.moveDateNo = true
            this.dt.setMonth(this.dt.getMonth() - 1);
        } else if(para == 'next' && this.moveDateNo == true) {this.moveDateNo = false
          this.dt.setMonth(this.dt.getMonth() + 1);
        }
        this.renderDate()
    }

}


