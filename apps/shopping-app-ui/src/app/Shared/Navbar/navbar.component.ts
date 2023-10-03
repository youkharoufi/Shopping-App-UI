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
  loggedUserReceived = false;


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

  login() {
    this.accountFacade.login(this.loginUser);
    this.showLoginModal = false;
    setTimeout(()=>{
      window.location.reload();
    },5000);
  }

}
