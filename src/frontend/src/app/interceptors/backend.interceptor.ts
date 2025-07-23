import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { BACKEND_URL_PREFIX } from '../utils/constants';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    if (req.url.startsWith(BACKEND_URL_PREFIX)) {
      let url = req.url.replace(BACKEND_URL_PREFIX, '');
      const modifiedRequest = req.clone({
        url: environment.apiUrl + url,
      });

      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}
