import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private messageService: MessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = JSON.parse(localStorage.getItem('user')!);  // Assuming `isLoggedIn` method returns a boolean

    if (isLoggedIn !== null) {
      this.router.navigate(['/']); // Assuming '/login' is your login route
      this.messageService.add({key:"mustLogin", severity:'warning', summary: 'Warning', detail: 'You have to be logged in to access your cart'});
      return false;
    }

    return true;
  }
}
