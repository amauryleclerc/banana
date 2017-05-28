import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [GraphService]
})
export class GraphComponent implements OnInit {

  private options: any;
  private chart: any;
  constructor(private graphService: GraphService) {
    this.options = {
      options: {
        chart: {
          type: 'line',
          backgroundColor: '#333333'
        },

        labels: {
          style: {
            color: '#000000',
            fontSize: 18
          }
        },
        legend: {
          itemStyle: {
            color: '#000000',
            fontSize: 18
          }
        },
        plotOptions: {
          series: {
            stacking: ''
          },
          yAxis: {
            title: {
              style: {
                color: '#000000'
              }
            }
          }
        }
      },
      series: [{
        name: 'Idéal',
        data: [0],
        type: 'line',
        connectNulls: false,
        dashStyle: 'Dot',
        lineWidth: 5,
        color: '#000000',
        dataLabels: {
          style: {
            color: '#000000'
          }
        }
      }, {
        data: [0],
        name: 'Bonus',
        type: 'line',
        dashStyle: 'Solid',
        lineWidth: 5,
        color: '#e13730'
      }, {
        data: [0],
        name: 'Engagé',
        type: 'line',
        dashStyle: 'Solid',
        lineWidth: 5,
        color: '#41b2c7'
      }
      ],
      title: {
        floating: true,
        text: 'Graph'
      },
      credits: {
        enabled: false
      },
      loading: false,
      subtitle: {
        floating: true
      },
      chart: {},
      yAxis:{
        min: 0
      }
    };
  }

  ngOnInit() {

  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
    this.graphService.getTitle().subscribe(title => {
      this.chart.title.update({ text: title });
    }, e => console.error(e));

    this.graphService.getXAxis().subscribe(xAxis => {
      this.chart.xAxis[0].update(xAxis);
    }, e => console.error(e));

    this.graphService.getComplexities().subscribe(complexities => {
      console.log(complexities[0]);
      this.getSeries('Engagé').update({ data: complexities });
    }, e => console.error(e));

    this.graphService.getBonusComplexities().subscribe(complexities => {
      this.getSeries('Bonus').update({ data: complexities });
    }, e => console.error(e));

    this.graphService.getIdealComplexities().subscribe(complexities => {
      this.getSeries('Idéal').update({ data: complexities });
    }, e => console.error(e));
  }

  private getSeries(name: string): any {
    return this.chart.series.find(series => series.name === name);
  }


}
