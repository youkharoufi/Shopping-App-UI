import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApplicationUser } from '../Models/applicationUser';
import { LoginUser } from '../Models/loginUser';
import { environment } from '../../environments/environment';
import { RegisterUser } from '../Models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  login(loginUser: LoginUser): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "account/login", loginUser);
  }

  register(registerUser: RegisterUser): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "account/register", registerUser);
  }


}
