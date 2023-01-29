import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import { DiagramRangeSellPriceType, DiagramRangeSoldType, ResultOmzetLineDiagramItem, ResultSellPriceLineDiagram, ResultSellPriceLineDiagramItem, ResultSoldLineDiagram, ResultSoldLineDiagramItem } from 'src/app/domain/backend/Dtos';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EChartsOption } from 'echarts';
import { startWith, tap, switchMap } from 'rxjs';
import { NumberSoldInARangeQuery, SellPriceChangeInARangeQuery } from 'src/app/domain/backend/Queries';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';

@UntilDestroy()
@Component({
  selector: 'app-sell-price-chart',
  standalone: true,
  
  templateUrl: './sell-price-chart.component.html',
  styleUrls: ['./sell-price-chart.component.scss'],
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
export class SellPriceChartComponent implements OnInit{
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
    this.setChartOption([], DiagramRangeSellPriceType.PRICE);
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
          switchMap((x:SellPriceChangeInARangeQuery)=> this._mygoodsService.getListProductSellPrice(x))
          
        )
        .subscribe(
          (x:ResultSellPriceLineDiagram) =>{
            this.itemsAverage = x.average;
            const temp: ResultSellPriceLineDiagramItem[]=[]
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
    this.typeOptions = Object.keys(DiagramRangeSellPriceType).filter((v) => isNaN(Number(v))).map(element=>{
      return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    });
  }


  setChartOption(itemsData:ResultSellPriceLineDiagramItem[], type: DiagramRangeSellPriceType):void{
    
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
        text: 'Perubahan Harga Jual per Tahun'
      },
      series: [
        {
          data: itemsData.map(x=>x.price),
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
