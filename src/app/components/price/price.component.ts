import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.scss']
})

export class Price {

    @Input() value: number = 0;
    @Input() currency: string ='';

    constructor() {}


}
