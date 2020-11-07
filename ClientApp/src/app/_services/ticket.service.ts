import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    
  }

  create(newTicket: any){
    return this.http.post<any>(this.baseUrl + 'ticket', newTicket);
  } 

  edit(editTicket){
    return this.http.put<any>(this.baseUrl + 'ticket', editTicket);
  }

  editList(editTicket){
    return this.http.put<any>(this.baseUrl + 'ticket/EditList', editTicket);
  }

  getAll(id){
    return this.http.get<any>(this.baseUrl + 'ticket'+"/"+id);
  } 

  getById(id){
    return this.http.get<any>(`${this.baseUrl}ticket/GetById/${id}`);
  } 

  getAllBy(status, id){
    return this.http.get<any>(this.baseUrl +"ticket/GetAllBy/"+status+"/"+id);
  }

  delete(id){
    return this.http.delete<any>(this.baseUrl +"ticket/"+id);

  }
}
