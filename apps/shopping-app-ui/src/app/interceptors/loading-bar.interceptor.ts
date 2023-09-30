
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import { LoadingService } from '../Services/loading.service';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("HTTP request initiated", request.url);

    this.loadingService.start();

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log("HTTP response received", request.url);
            this.loadingService.stop();
          }
        },
        error => {
          console.log("HTTP request error", request.url, error);
          this.loadingService.stop();
        }
      )
    );
  }

}
