import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth-service';
import { LoginData } from '../../../dto/auth/AuthData';
import { CookieManagerService } from '../../../services/cookie-manager-service';

@Component({
  selector: 'app-login-page',
  imports: [MatFormFieldModule, MatLabel, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit{



  authService = inject(AuthService);
  cookieService = inject(CookieManagerService);
  router = inject(Router);

  loginForm= new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

    ngOnInit(): void {
    if(this.cookieService.isLogged()){
         this.router.navigateByUrl('/dashboard');
         return;
    }
  }


  execute(){
    const user:LoginData = {
      email: this.loginForm.value.email!,
      password:this.loginForm.value.password!
    }
    this.authService.login(user).subscribe({
      next:(res)=>{
        this.cookieService.setToken(res.data.token);
        this.router.navigateByUrl('/dashboard');
      }
    })
  }


}
