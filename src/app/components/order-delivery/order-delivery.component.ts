import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../../types/types';

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
    public cities: any = [];
    public fee = 10;
    public vat = 0.17;
    public price = 0;
    public currency = 'NIS';
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
        ]),
        pickupAddress: new FormControl('', [
            Validators.required
        ]),
        dropOffAddress: new FormControl('', [
            Validators.required
        ]),
        pickupCity: new FormControl('', [
            Validators.required
        ]),
        dropOffCity: new FormControl('', [
            Validators.required
        ])
    });

    public calcPrice(pickupCity: string, dropOffCity: string, citiesList: Array<City>, fee: number, vat: number): number {
        let price = 0,
            pickUpCityPrice = 0,
            dropOffCityPrice = 0;
    
        // find the prices of the two cities
        for (const city of citiesList) {
            if (city.enName === pickupCity) {
                pickUpCityPrice = city.price;
            } else if (city.enName === dropOffCity) {
                dropOffCityPrice = city.price;
            }
        }
    
        // if the cities are the same, charge the price of that city
        if (pickupCity === dropOffCity) {
            price = pickUpCityPrice;
        } else {
            // if the cities are different, charge the price of both cities plus fee
            price = pickUpCityPrice + dropOffCityPrice + 10;
        }
    
        // add VAT to the price
        return price + (price * vat);;
    }

    public onSubmit() {
        if(!this.deliveryDetailsForm.valid) {
            return this.deliveryDetailsForm.markAllAsTouched();
          }

        this.dataService.submitOrder(this.deliveryDetailsForm.value).subscribe({
            next: (res) => {
                this.toastr.success('Order Created');
                this.deliveryDetailsForm.reset({
                    pickupCity: '',
                    dropOffCity: ''    
                });
                this.price = 0;
            },
            error: (err) => console.log(err)
        });
    }

    public onCitySelected(e: Event, controlName: string) {
        const input = e.target as HTMLInputElement;
        const self: any = this;
        self[controlName].patchValue(input.value);
        if(this.pickupCity.value && this.dropOffCity.value) {
            this.price = this.calcPrice(this.pickupCity.value, this.dropOffCity.value, this.cities, this.fee,this.vat);
        }
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

    get pickupAddress(): any {
        return this.deliveryDetailsForm.get('pickupAddress');
    }

    get dropOffAddress(): any {
        return this.deliveryDetailsForm.get('dropOffAddress');
    }

    get pickupCity(): any {
        return this.deliveryDetailsForm.get('pickupCity');
    }

    get dropOffCity(): any {
        return this.deliveryDetailsForm.get('dropOffCity');
    }

    ngOnInit() {
        this.dataService.getCities().subscribe((res: any) => {
            this.cities = res;
        });
    }

}
