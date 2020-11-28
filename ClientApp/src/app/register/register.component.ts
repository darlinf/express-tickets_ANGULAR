import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  first
} from 'rxjs/operators';
import {
  AuthenticationService, UserService
} from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('enterState', [
      state('void', style({
        // transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate(300, style({
          //transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  checkMail(){
    this.emailIsValid = null
    if(this.loginForm.value.mail)
    this.userService.checkMail(this.loginForm.value.mail).subscribe(x => {console.log("sss")

    }, x => {
      console.error(x)
      this.emailIsValid = x.message
    })
  }
  CheckPassword(text:string){console.log(this.loginForm.value.password)
    if(this.loginForm.value.password == text){
      this.checkPassword = false
    }else{
      this.checkPassword = true
    }
    
  }
  checkPassword:boolean
  emailIsValid:string

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          this.authenticationService.login(this.loginForm.value.mail, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
              data => {
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error;
                this.loading = false;
              });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
