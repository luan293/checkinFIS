import { Injectable, Component, Inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,

    HttpClient
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, timer} from 'rxjs';
import {
    map, catchError, tap, timeout, retry, retryWhen,
    mergeMap, take, concat, delay, finalize, concatMap
} from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public http: HttpClient ) {
        console.log('HttpConfigInterceptor constructor');
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //if (request.url.includes('apietms/api/ChechInData/MobileAddCheckInOut')) {
    //  request = request.clone({ headers: request.headers.set('Authorization', request.body['authtoken']) });

    //} else {

    //}

    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        console.log('HttpConfigInterceptor', request);
        return next.handle(request).pipe(
            timeout(30000),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('HttpConfigInterceptor catchError', error);
               
                return throwError(error);
            }),
            finalize (() => { console.log('[debug] funally'); })
        )
    }

}
