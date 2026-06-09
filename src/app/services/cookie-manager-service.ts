import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieManagerService {
  TOKEN_NAME='POS_TOKEN';
  private _cookieService = inject(CookieService);


  isLogged(){
    return this._cookieService.check(this.TOKEN_NAME);
  }

}
