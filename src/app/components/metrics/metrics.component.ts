import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import {MetricsValues} from "../../types/metrics-values";
import {MetricBlock} from "../../types/metric-block";
import {MetricsService} from "../../services/metrics/metrics.service";

@Component({
    selector: 'metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.scss']
})

export class MetricsComponent implements OnChanges {

    constructor(private utilsService: UtilsService, private metricsService: MetricsService) {}

    @Input() analyticsData: Array<MetricsValues> = [];

    public metricOptions:Array<string> = ['sum', 'average'];
    public currentMetricOption: string = this.metricOptions[0];
    public metrics: Array<MetricBlock> = [];
    private memoizedCalculateTotals: any;
    private memoizedCalculateAverages: any;
    public metricsValues: MetricsValues = {};

    private setMetricValues() {
        // memoized methods will return cached values and won't calculate the result on every select change
        switch(this.currentMetricOption) {
          case 'sum':
            this.metricsValues = this.memoizedCalculateTotals(this.analyticsData, this.metrics);
          break;
          case 'average':
            this.metricsValues = this.memoizedCalculateAverages(this.metricsValues, this.analyticsData.length);
          break;
        }
    }

    public onMetricOptionChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.currentMetricOption = input.value;
        this.setMetricValues();
    }

    private calculateTotals(data: Array<{ [key: string]: number }>, metrics: Array<MetricBlock>) {
      // Create an empty object to store the sums
      const sums: { [key: string]: number } = {};

      // Iterate over the metrics
      for (const metric of metrics) {
        // Use the reduce method to sum the values of the metric
        sums[metric.name] = data.reduce((sum: number, entry: { [key: string]: number }) => sum + entry[metric.name], 0);
      }

      return sums;
    }

    private calculateAverages(metrics: { [key: string]: number }, dataLength: number) {

        const averages: { [key: string]: number } = {};
        // Iterate over metric field names
        for(let metric in metrics) {
            // calculate averages for all the metrics
            averages[metric] = Math.floor(metrics[metric] / dataLength)
        }

        return averages;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['analyticsData'].firstChange) {
            // use memoized methods to calculate values only when their properties are changed
            this.memoizedCalculateTotals = this.utilsService.memoize(this.calculateTotals);
            this.memoizedCalculateAverages = this.utilsService.memoize(this.calculateAverages);
            this.metrics = this.metricsService.getMetrics();
            this.setMetricValues();
        }
    }

}
