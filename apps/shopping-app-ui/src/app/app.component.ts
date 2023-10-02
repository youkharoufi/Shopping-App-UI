import { LoadingService } from './Services/loading.service';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'shopping-app-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isIndexRoute = false;

  loadingProgress = 0;


  constructor(private ngZone: NgZone, private router: Router, public loadingBarService : LoadingService, private cdr: ChangeDetectorRef) {
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





}

