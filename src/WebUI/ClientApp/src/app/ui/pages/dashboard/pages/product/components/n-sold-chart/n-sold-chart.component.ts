import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EChartsOption } from 'echarts';
import { startWith, tap, switchMap } from 'rxjs';
import { DiagramRangeSoldType, ResultOmzetLineDiagramItem, ResultSoldLineDiagram, ResultSoldLineDiagramItem } from 'src/app/domain/backend/Dtos';
import { GetOmzetQuery, NumberSoldInARangeQuery } from 'src/app/domain/backend/Queries';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';

@UntilDestroy()
@Component({
  selector: 'app-n-sold-chart',
  standalone: true,
  templateUrl: './n-sold-chart.component.html',
  styleUrls: ['./n-sold-chart.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxEchartsModule
  ],
  providers:[
    MyGoodsService
  ]
})
export class NSoldChartComponent implements OnInit {
  @Input() id!:string;
  isLoading = false;
  form:FormGroup = new FormGroup({
    Year: new FormControl(2022,{nonNullable:true}),
    Type:new FormControl(1,{nonNullable:true}),
    Id: new FormControl("",{nonNullable:true}),
  });
  chartOption: EChartsOption;
  itemsAverage: number = 0;
  get fieldYear():AbstractControl|null{
    return this.form.controls.Year;
  }

  yearOptions = [];
  typeOptions = [];

  constructor(
    private _mygoodsService: MyGoodsService
    ) {}

   
  ngOnInit(): void {
    this.setYearOptions();
    this.setTypeOptions();
    this.setChartOption([], DiagramRangeSoldType.SUM);
    this.form.patchValue({Id:this.id});
    this.form.valueChanges
        .pipe(
          untilDestroyed(this),
          startWith({
            Year: new Date().getFullYear(),
            Id: this.id,
            Type: DiagramRangeSoldType.SUM
          }),
          tap(()=>this.isLoading = true),
          switchMap((x:NumberSoldInARangeQuery)=> this._mygoodsService.getListProductNSold(x))
          
        )
        .subscribe(
          (x:ResultSoldLineDiagram) =>{
            this.itemsAverage = x.average;
            const temp: ResultOmzetLineDiagramItem[]=[]
            this.setChartOption(x.items, x.type);
            this.isLoading=false;            
          }
        );
  }

  setYearOptions(): void {
    const anchorYear: number = 2022;
    const thisYear: number = new Date().getFullYear();
    for (let index = 0; index < thisYear - anchorYear + 1; index++) {
      this.yearOptions.push(anchorYear + index);
    }
  }
  setTypeOptions():void{
    this.typeOptions = Object.keys(DiagramRangeSoldType).filter((v) => isNaN(Number(v))).map(element=>{
      return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    });
  }


  setChartOption(itemsData:ResultSoldLineDiagramItem[], type: DiagramRangeSoldType):void{
    
    this.chartOption={
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params[0].axisValue +" : "+params[0].data
        },
        axisPointer: {
          animation: false
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: itemsData.map(x=> {
          const dd = new Date(x.dateTime);
          return dd.getDate() + '/'+(dd.getMonth()+1)+'/'+dd.getFullYear()
        })
      },
      yAxis: {
        type: 'value'
      },
      title: {
        left: 'center',
        text: 'Penjualan Barang per Tahun'
      },
      series: [
        {
          data: itemsData.map(x=>x.n),
          type: itemsData.length > 20 ? 'line' : 'bar',
          markLine: {
            data: [{
              name: 'average line',
              type: 'average'
            }],
            lineStyle: {
              color: 'red'
            },
          },
          
        },
        
      ]
    }
  }
}
