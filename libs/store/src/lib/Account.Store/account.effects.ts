import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AccountActions from './account.actions';
import { AccountService } from './account.service';
import { ApplicationUser } from '../Models/applicationUser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageService } from 'primeng/api';


@Injectable()
export class AccountEffects {


  private currentUserSource = new BehaviorSubject<ApplicationUser | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  setCurrentUser(user: ApplicationUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loginAccount),
      switchMap((action) =>
        this.backend.login(action.loginUser).pipe(
          tap((user:ApplicationUser) => {
            if (user!==null) {
              console.log(user);
              this.setCurrentUser(user);
            }
          }),
            map((loggedUser: ApplicationUser) =>
              AccountActions.loginAccountSuccess({ loggedUser })
            ),
            catchError((error) =>
              of(AccountActions.loginAccountFailure({ error }))
            )

        )
      )
      )
  );

  showLoginError$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AccountActions.loginAccountFailure),
    tap(() => {
      this.messageService.add({key:"loginFailure", severity:'error', summary: 'Error', detail: 'Login Failed! Invalid credentials'});
    })
  ), { dispatch: false }
);

showLoginSuccess$ = createEffect(() =>
this.actions$.pipe(
  ofType(AccountActions.loginAccountSuccess),
  tap(() => {
    this.messageService.add({key:"loginSuccess", severity:'success', summary: 'Success', detail: 'You are logged in successfully !'});
  })
), { dispatch: false }
);


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.registerAccount),
      switchMap((action) =>
        this.backend.register(action.registerUser).pipe(
          map((registeredUser: ApplicationUser) =>
            AccountActions.registerAccountSuccess({ registeredUser })
          ),
          catchError((error) =>
            of(AccountActions.registerAccountFailure({ error }))
          )

        )
      )
    )
  );

//   showRegisterError$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(AccountActions.registerAccountFailure),
//     tap(() => {
//       console.log("mermelak");
//       this.messageService.add({key:"registerSuccess", severity:'success', summary: 'Success', detail: 'You have been registered successfully !'});
//     })
//   ), { dispatch: false }
// );

showRegisterSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AccountActions.registerAccountSuccess),
    tap(() => {
      this.messageService.add({key:"registerSuccess", severity:'success', summary: 'Success', detail: 'You have been registered successfully'});
    })
  ), { dispatch: false }
);


  constructor(private actions$: Actions, private backend: AccountService, private messageService : MessageService) { }

        }
