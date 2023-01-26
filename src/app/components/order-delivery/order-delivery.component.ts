import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'order-delivery',
    templateUrl: './order-delivery.component.html',
    styleUrls: ['./order-delivery.component.scss']
})

export class OrderDeliveryComponent implements OnInit {
    
    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService, 
        private toastr: ToastrService,
        private router: Router
    ) {}

    private IsraelPhonePattern = '^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$';

    public deliveryDetailsForm = new FormGroup({
        senderName: new FormControl('', [
            Validators.required
        ]),
        receiverName: new FormControl('', [
            Validators.required
        ]),
        senderPhoneNumber: new FormControl('', [
            Validators.required, Validators.pattern(this.IsraelPhonePattern)
        ]),
        receiverPhoneNumber: new FormControl('', [
            Validators.required, Validators.pattern(this.IsraelPhonePattern)
        ])
    });

    public onSubmit = () => {
        if(!this.deliveryDetailsForm.valid) {
            return this.deliveryDetailsForm.markAllAsTouched();
          }
        const formData = {
            senderName: this.senderName.value,
            receiverName: this.receiverName.value,
            senderPhoneNumber: this.senderPhoneNumber.value,
            receiverPhoneNumber: this.receiverPhoneNumber.value
        };

        this.dataService.submitOrder(formData).subscribe({
            next: (res) => {
                this.toastr.success('Order Created');
                this.deliveryDetailsForm.reset();
            },
            error: (err) => console.log(err)
        });


    }

    get senderName(): any {
        return this.deliveryDetailsForm.get('senderName');
    }

    get receiverName(): any {
        return this.deliveryDetailsForm.get('receiverName');
    }

    get senderPhoneNumber(): any {
        return this.deliveryDetailsForm.get('senderPhoneNumber');
    }

    get receiverPhoneNumber(): any {
        return this.deliveryDetailsForm.get('receiverPhoneNumber');
    }

    ngOnInit() {
       
    }

}
