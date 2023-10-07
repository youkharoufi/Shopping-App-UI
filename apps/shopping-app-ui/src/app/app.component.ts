import { LoadingService } from './Services/loading.service';
import { ApplicationConfig, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApplicationUser, CartFacade, Product } from '@shopping-app-ui/store';
import { Cart } from 'libs/store/src/lib/Models/cart';


@Component({
  selector: 'shopping-app-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  isIndexRoute = false;

  loadingProgress = 0;

  user!:ApplicationUser;

  productCount$ = this.cartFacade.count$;

  productCount= "0" ;

  createdCart$ = this.cartFacade.createdCart$;

  constructor(private ngZone: NgZone, private router: Router, public loadingBarService : LoadingService, private cdr: ChangeDetectorRef,
              private cartFacade: CartFacade) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isIndexRoute = event.urlAfterRedirects === '/';
      }
    });

    this.loadingBarService.loadingProgress.subscribe(progress => {
      this.loadingProgress = progress;
  });
  // If you still need to manually trigger change detection after this:
  this.cdr.markForCheck();
}

    ngOnInit(): void{

      if(localStorage.getItem('user') !== null){
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.cartFacade.createCart(this.user.id);

        this.createdCart$.subscribe({
          next:(value?:Cart)=>{
            if(value){
              this.cartFacade.productCount(this.user.id, value!.cartId);
              this.productCount$.subscribe({
                next:(count?:number)=>{
                  if(count) this.productCount = typeof(count) === undefined ? '0' : count?.toString();
                }
              })
            }
            }


        })
      }





    }







}

