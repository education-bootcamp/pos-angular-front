import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterData } from '../dto/auth/AuthData';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl=environment.baseURL;
  private httpClient = inject(HttpClient);

  register(registerData:RegisterData): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/auth/register`,registerData);
  }

}
