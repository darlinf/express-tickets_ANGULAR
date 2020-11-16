import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
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
export class RecoveryPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService
  ) { 
    this.route.params.subscribe(params => {
      this.token = params['token'];
      if(this.token != null){
        this.userService.ifTokenValid(this.token).subscribe(x => {
          this.tokenOk = false
        }, e =>{ 
          console.error(e)
          this.tokenOk = true
        })
      }
      
    })
  }

  ngOnInit() {
  }

  SendEmail(){
    this.loading = true
    this.userService.passwordRecovery(this.emailDestination).subscribe(x => {
      this.loading = false
      this.success = "El correo de fue enviado"
    }, e => {
      console.error(e)
      this.error = e.error.message
      this.loading = false
      setTimeout(()=>this.error = null, 3000)
    })
    
  }

  changePassword(){
    this.loading = true
    this.userService.passwordRecoveryFinish({Token: this.token, NewPassword: this.repeatPassword}).subscribe(x => {
      this.loading = false
      this.newPassword = ""
      this.repeatPassword = ""
      this.success = "Contrasena cambiada con exito!"
    }, e => console.error())
  }

  token:string
  loading = false
  emailDestination: string
  success: string
  error:string

  repeatPassword:string
  newPassword:string

  tokenOk = false
}
