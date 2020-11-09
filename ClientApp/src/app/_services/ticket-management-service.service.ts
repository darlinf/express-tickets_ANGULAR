import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketManagementServiceService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    
  }

  cancelBus(id: string){
    return this.http.get<any>(this.baseUrl + 'TicketManagement/CancelBus/' + id);
  } 

  changeUserRol(mail: string){
    return this.http.get<any>(this.baseUrl + 'TicketManagement/ChangeUserRol/' + mail);
  } 

  redeemTicket(code: string){
    return this.http.get<any>(this.baseUrl + 'TicketManagement/RedeemTicket/' + code);
  } 
}
