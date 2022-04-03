import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponse{

  UserName:string,
  AccessToken:string,
  Expiration:string
  RefreshToken:string,
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="http://localhost:35512/api/";
  constructor(private httpClient:HttpClient) { }

  signup(email:string,password:string){
    return this.httpClient.post<AuthResponse>(this.apiUrl+"Auth/Register",
    {
      Email:email,
      Parola:password
    }).pipe(
      catchError(this.handleError)
    );
  }

  login(email:string,password:string){
    return this.httpClient.post<AuthResponse>(this.apiUrl+"Auth/Login",
    {
      Email:email,
      Parola:password
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorResponse:HttpErrorResponse){
    return throwError("Hata")
  }
}
