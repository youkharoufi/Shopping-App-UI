import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private activeRequests = 0;

  private interval: any;

start() {
  this.activeRequests++;
  if (this.activeRequests === 1) {
    this.loadingProgress.next(0);

        // Increase progress by 25 every second, so it takes 4 seconds to reach 100
        this.interval = setInterval(() => {
            let currentProgress = this.loadingProgress.getValue();
            currentProgress += 25;

            if (currentProgress >= 100) {
                currentProgress = 100;
                this.stop();
            }

            this.loadingProgress.next(currentProgress);
        }, 1000);
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
