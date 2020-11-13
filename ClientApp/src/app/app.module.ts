import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { LoginComponent } from './login/login.component';
import { appRoutingModule } from './app.routing';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { PayComponent } from './pay/pay.component';
import { DateMyFormatPipe } from './_pipes/date-my-format.pipe';
import { PayResurtComponent } from './pay-resurt/pay-resurt.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_helpers';
import { BillingComponent } from './billing/billing.component';

@NgModule({  
  declarations: [
    MyTicketsComponent,
    LoginComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    CartComponent,
    BookTicketsComponent,
    TicketManagementComponent,
    PayComponent,
    DateMyFormatPipe,
    PayResurtComponent,
    EditTicketComponent,
    UserEditComponent,
    FooterComponent,
    BillingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    appRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
