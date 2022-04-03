import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export interface AuthResponse{

  userName:string,
  accessToken:string,
  expiration:string
  refreshToken:string,
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
      catchError(this.handleError),
      tap(resData=>this.handleAuthentication(resData.accessToken,resData.refreshToken))
    );
  }

  login(email:string,password:string){
    return this.httpClient.post<AuthResponse>(this.apiUrl+"Auth/Login",
    {
      Email:email,
      Parola:password
    }).pipe(
      catchError(this.handleError),
      tap(resData=>this.handleAuthentication(resData.accessToken,resData.refreshToken))
    );
  }

  private handleAuthentication(accessToken:string,refreshToken:string)
  {
    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("refreshToken",refreshToken);
  }

  private handleError(errorResponse:HttpErrorResponse){
    return throwError("Hata")
  }
}
