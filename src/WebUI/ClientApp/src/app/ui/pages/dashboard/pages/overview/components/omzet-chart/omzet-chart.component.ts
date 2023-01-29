import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEnterpriseService } from 'src/app/infrastructure/backend/my-enterprise.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, startWith, switchMap, tap } from 'rxjs';
import { GetOmzetQuery } from 'src/app/domain/backend/Queries';
import {
  ResultOmzetLineDiagram,
  ResultOmzetLineDiagramItem,
} from 'src/app/domain/backend/Dtos';
import { EChartsOption, LegendComponentOption } from 'echarts';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxEchartsModule } from 'ngx-echarts';

@UntilDestroy()
@Component({
  selector: 'app-omzet-chart',
  standalone: true,
  templateUrl: './omzet-chart.component.html',
  styleUrls: ['./omzet-chart.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxEchartsModule,
  ],
})
export class OmzetChartComponent implements OnInit {
  isLoading = false;
  form: FormGroup = new FormGroup({
    Year: new FormControl(2022, { nonNullable: true }),
  });
  chartOption: EChartsOption;
  itemsAverage: number = 0;
  get fieldYear(): AbstractControl | null {
    return this.form.controls.Year;
  }

  yearOptions = [];

  constructor(private _myenterpriseService: MyEnterpriseService) {}

  addays(days: number): Date {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  ngOnInit(): void {
    this.setYearOptions();
    this.setChartOption([]);
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        tap((x) => (this.isLoading = true)),
        switchMap((x: GetOmzetQuery) =>
          this._myenterpriseService.GetOmzetMyEnterprise(x)
        ),
        catchError((error, source) => {
          return source;
        })
      )
      .subscribe((x: ResultOmzetLineDiagram) => {
        this.itemsAverage = x.average;
        const temp: ResultOmzetLineDiagramItem[] = [];
        this.setChartOption(x.items);
        this.isLoading = false;
      });

    this.form.patchValue({
      Year: new Date().getFullYear(),
    });
  }

  setYearOptions(): void {
    const anchorYear: number = 2023;
    const thisYear: number = new Date().getFullYear();
    for (let index = 0; index < thisYear - anchorYear + 1; index++) {
      this.yearOptions.push(anchorYear + index);
    }
  }

  setChartOption(itemsData: ResultOmzetLineDiagramItem[]): void {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params[0].axisValue + ' : ' + params[0].data;
        },
        axisPointer: {
          animation: false,
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: itemsData.map((x) => {
          const dd = new Date(x.dateTime);
          return (
            dd.getDate() + '/' + (dd.getMonth() + 1) + '/' + dd.getFullYear()
          );
        }),
      },
      yAxis: {
        type: 'value',
      },
      title: {
        left: 'center',
        text: 'Omzet per Tahun',
      },
      series: [
        {
          data: itemsData.map((x) => x.total),
          type: itemsData.length > 20 ? 'line' : 'bar',
          markLine: {
            data: [
              {
                name: 'average line',
                type: 'average',
              },
            ],
            lineStyle: {
              color: 'red',
            },
          },
        },
      ],
    };
  }
}
