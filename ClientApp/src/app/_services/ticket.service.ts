import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    
  }

  create(newTicket: any){console.log(newTicket)
    return this.http.post<any>(this.baseUrl + 'ticket', newTicket);
  } 

  getAll(id){
    return this.http.get<any>(this.baseUrl + 'ticket'+"/"+id);
  } 

  getAllBy(status, id){
    return this.http.get<any>(this.baseUrl +"ticket/GetAllBy/"+status+"/"+id);
  }

  delete(id){
    return this.http.delete<any>(this.baseUrl +"ticket/"+id);

  }
}
