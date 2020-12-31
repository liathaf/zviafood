import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { UserService } from '../services/user.service'


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private UserService: UserService , private router: Router){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    
    const isLoggedinUser = this.UserService.isLoggedinUser();
    if (isLoggedinUser) {
      this.router.navigateByUrl('/');
      return false;
    } else{ 
      return true;
    }
    
  }

}
