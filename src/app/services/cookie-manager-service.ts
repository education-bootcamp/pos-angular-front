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

  getToken():string | null{
    const token = this._cookieService.get(this.TOKEN_NAME);
    return token || null;
  }

  setToken(token: string){
    this._cookieService.set(this.TOKEN_NAME, token);
  }

  removeToken(){
    this._cookieService.delete(this.TOKEN_NAME)
  }

  logout():boolean{
    this._cookieService.deleteAll();
    return true;
  }

}
