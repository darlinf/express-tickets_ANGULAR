import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    checkMail(mail){
        return this.http.get<any>(this.baseUrl+"users/CheckEmail/"+mail);
    }

    passwordRecovery(emailDestination){
      return this.http.post<any>(this.baseUrl + "users/PasswordRecovery",
        { EmailDestination: emailDestination, UrlToSend: this.baseUrl + "recuperarContrasena" });
    }

    ifTokenValid(token){
        return this.http.get<any>(this.baseUrl+"users/IfTokenValid/"+token);
    }

    passwordRecoveryFinish(model){
        return this.http.post<any>(this.baseUrl+"users/PasswordRecoveryFinish", model);
    }
}
