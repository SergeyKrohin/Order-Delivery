import { Component, Input } from '@angular/core';

@Component({
    selector: 'metric-block',
    templateUrl: './metric-block.component.html',
    styleUrls: ['./metric-block.component.scss']
})

export class MetricBlock {

    @Input() name: string = '';
    @Input() text: string = '';
    @Input() value: any = 0;

}
