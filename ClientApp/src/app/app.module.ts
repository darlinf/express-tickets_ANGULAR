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
    PayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    appRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
