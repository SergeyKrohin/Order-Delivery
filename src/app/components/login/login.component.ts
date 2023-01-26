import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data/api.service';
import {HttpErrorResponse} from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    
    constructor(
        private formBuilder: FormBuilder, 
        private dataService: DataService, 
        private toastr: ToastrService,
        private router: Router
    ) {}

    public loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required
        ]),
        password: new FormControl('', [
            Validators.required
        ])
    });

    public submitted = false;

    get email(): any {
        return this.loginForm.get('email');
    }
    get password(): any {
        return this.loginForm.get('password');
    }

    public onSubmit = () => {
        if(!this.loginForm.valid) {
            return this.loginForm.markAllAsTouched();
          }
        const formData = {
            email: this.email.value,
            password: this.password.value
        };

        this.dataService.login(formData).subscribe({
            next: (res) => {
                this.toastr.success('Login Successful');
                this.router.navigate(['/order-delivery']);
            },
            error: (err) => console.log(err)
        });
    }

    ngOnInit() {
       
    }

}
