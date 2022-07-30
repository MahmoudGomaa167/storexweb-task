import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserLoginGuardGuard implements CanActivate {

  constructor(private _UserAuthService: UserAuthService, private _Router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!localStorage.getItem('userInfo')) {
        return true;
      }else{
        this._Router.navigate(['/home'])
        return false;
      }
  }
  
}
