import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketManagementServiceService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    
  }

  cancelBus(id: number){
    return this.http.get<any>(this.baseUrl + 'ticket/CancelBus/' + id);
  } 

  changeUserRol(mail: string){
    return this.http.get<any>(this.baseUrl + 'ticket/ChangeUserRol/' + mail);
  } 

  redeemTicket(code: number){
    return this.http.get<any>(this.baseUrl + 'ticket/RedeemTicket/' + code);
  } 
}
