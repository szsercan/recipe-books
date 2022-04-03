import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let accessToken=localStorage.getItem("accessToken");
    if(accessToken!=null)
    {
      request=request.clone({
        headers:request.headers.set("Authorization","Bearer "+accessToken)
      });
    }
    
    return next.handle(request);
  }
}
