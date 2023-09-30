
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import { LoadingService } from '../Services/loading.service';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.start();

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.loadingService.stop();
        }
      }, error => {
        this.loadingService.stop();
      })
    );
  }
}
