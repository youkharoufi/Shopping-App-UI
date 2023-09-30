import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private activeRequests = 0;

start() {
  this.activeRequests++;
  if (this.activeRequests === 1) {
    this.loadingProgress.next(10);
    // ... (rest of your start logic)
  }
}

stop() {
  this.activeRequests--;
  if (this.activeRequests === 0) {
    this.loadingProgress.next(100);
    setTimeout(() => this.loadingProgress.next(0), 300);
  }
}

}
