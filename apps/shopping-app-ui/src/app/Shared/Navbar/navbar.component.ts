
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '@shopping-app-ui/store';
import { AccountFacade } from 'libs/store/src/lib/Account.Store/account.facade';

@Component({
  selector: 'shopping-app-ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent{

  showLoginModal = false;
  loginForm!: FormGroup;
  loginUser : LoginUser = {
    emailOrUserName:'',
    password:''
  }

  error$ = this.accountFacade.error$;

  loggedUser$ = this.accountFacade.loggedUser$;

  showLoginErrorToast = false;
  showLoginSuccessToast = false;

  @Output() dataEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private accountFacade: AccountFacade, private cdr: ChangeDetectorRef){}


  redirectToRegister(){
    this.router.navigateByUrl('/register');
  }

  displayLoginModal(){
      this.showLoginModal = true;
      this.dataEmitter.emit(this.showLoginModal);
  }

  login(){
    this.accountFacade.login(this.loginUser);
    this.error$.subscribe({
      next:(error?: Error | null)=>{

        if(error !== null || error !== undefined){
          this.showLoginErrorToast = true
          setTimeout(()=>{
            this.showLoginErrorToast = false
          },4000);
          this.cdr.detectChanges();
          return;
        }
          this.showLoginSuccessToast = true
          setTimeout(()=>{
            this.showLoginSuccessToast = false
          },4000);
          this.cdr.detectChanges();

      }
    })
  }
}
