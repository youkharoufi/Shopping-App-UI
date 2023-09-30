import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  start() {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      this.loadingProgress.next(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  }

  stop() {
    this.loadingProgress.next(100);
    setTimeout(() => this.loadingProgress.next(0), 300);  // Reset after a short delay
  }

}
