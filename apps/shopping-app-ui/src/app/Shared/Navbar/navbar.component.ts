import { LoadingService } from './../../Services/loading.service';

import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '@shopping-app-ui/store';
import { AccountFacade } from 'libs/store/src/lib/Account.Store/account.facade';
import { ApplicationUser } from 'libs/store/src/lib/Models/applicationUser';
import { filter, take } from 'rxjs';

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
  loggedUserReceived!:boolean;

  showLoginErrorToast = false;
  showLoginSuccessToast = false;

  @Output() dataEmitter = new EventEmitter<boolean>();

  constructor(private loadingBarService : LoadingService, private router: Router, private accountFacade: AccountFacade, private cdr: ChangeDetectorRef, private fb:FormBuilder){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      emailOrUserName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  redirectToRegister(){
    this.router.navigateByUrl('/register');
  }

  displayLoginModal(){
      this.showLoginModal = true;
      this.dataEmitter.emit(this.showLoginModal);
  }

  login(){
    this.accountFacade.login(this.loginUser);
    this.loggedUser$.subscribe((user?: ApplicationUser) => {
      if (user) {
        this.loggedUserReceived = true
        this.loadingBarService.start();
        this.showLoginSuccessToast = true;
        setTimeout(() => {
          this.showLoginSuccessToast = false;
          this.loadingBarService.stop();
          window.location.reload();
        }, 4000);
        this.cdr.detectChanges();
      }
    });

    if(!this.loggedUserReceived) {
      // Do something when there's no user
      this.loadingBarService.start();
      this.showLoginErrorToast = true;
      setTimeout(() => {
        this.showLoginErrorToast = false;
        this.loadingBarService.stop();
        window.location.reload();
      }, 4000);
      this.cdr.detectChanges();
    }
    this.showLoginModal = false;
    this.loggedUserReceived = false;

  }

}
