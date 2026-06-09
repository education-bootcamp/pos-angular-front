import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { SnackbarService } from '../../../services/snackbar-service';
import { AuthService } from '../../../services/auth-service';
import { RegisterData } from '../../../dto/auth/AuthData';

@Component({
  selector: 'app-register-page',
  imports: [MatFormFieldModule, MatLabel, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  router = inject(Router);
  snackbarService = inject(SnackbarService);
  authService = inject(AuthService);

  form= new FormGroup({
    fullName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  execute(){
    
    if(this.form.valid){

      let user:RegisterData={
        fullName:this.form.get('fullName')?.value!,
        email:this.form.get('email')?.value!,
        password:this.form.get('password')?.value!,
      }

    this.authService.register(user).subscribe({
      complete:()=>{
        this.snackbarService.openSnackBar('Please login!','Close')
        this.router.navigateByUrl('/home/login');
      },
      error:()=>{}
    })

    }else{
      this.snackbarService.openSnackBar('please check all the fields..','Close')
    }
    
  }


}
