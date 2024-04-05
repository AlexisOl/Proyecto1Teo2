import { Component , OnInit, ViewChild} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-seccion-voluntariado-general',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './seccion-voluntariado-general.component.html',
  styleUrl: './seccion-voluntariado-general.component.css'
})



export class SeccionVoluntariadoGeneralComponent implements OnInit{
  chart:any
  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  constructor(){

  }

  ngOnInit(): void {
      this.chart = new Chart('canvas', {
        type:'pie',
        data:{
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data.map(row => row.count)
            }
          ]
        }
      })
  }
}
