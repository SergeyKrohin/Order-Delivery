import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { LoginDetails, OrderDetails } from '../../types/types';
import { ToastrService } from 'ngx-toastr';
import { CookiesService } from '../cookies/cookies.service';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';   

@Injectable()
export class DataService {

    constructor(
        private http: HttpClient, 
        private toastr: ToastrService, 
        private cookiesService: CookiesService,
        private router: Router
    ) {}

    private apiUrl = 'https://mock-stg.getpackage-dev.com';
    private headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

    public login(loginDetails: LoginDetails): Observable<any> {
        return this.http
        .post(this.apiUrl + '/login', loginDetails)
        .pipe(tap((res: any) => {
            if(res.res === 'unknown request') {
                throw new Error('Password invalid');
            }
            this.cookiesService.setCookie('token', res.token, 1);
            return res; 
        }))
        .pipe(catchError((err) => this.handleError(err)))
    }

    public submitOrder(orderDetails: any): Observable<any> {
        const token = this.cookiesService.getCookie('token');
        if(!token) {
            this.router.navigate(['/login']);
            return this.handleError(new Error('Token invalid'));
        } else {
            orderDetails.token = token;
        }
        
        return this.http
        .post(this.apiUrl + '/submit', orderDetails)
        .pipe(catchError((err) => this.handleError(err)))
    }

    public getCities() {
        return this.http
        .get(this.apiUrl + '/cities')
        .pipe(catchError((err) => this.handleError(err)))
    }

    private handleError(error: any) {
        this.toastr.error(error.message);
        return throwError(() => new Error(error))
    }

}