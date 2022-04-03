import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading=false;
  isLoginMode=true;
  error:string=null;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
      
    const email=form.value.email;
    const password=form.value.password;

    let authObs:Observable<AuthResponse>;
    
    this.isLoading=true;
    if(this.isLoginMode){
      authObs= this.authService.login(email,password)
    }
    else{
      authObs= this.authService.signup(email,password)
    }

    authObs.subscribe((response)=>{
      this.isLoading=false;
      this.router.navigate(['/recipes'])
    },
    (errorMessage)=>{
      this.error=errorMessage;
      this.isLoading=false;
    });

    
    form.reset()
  }

}
