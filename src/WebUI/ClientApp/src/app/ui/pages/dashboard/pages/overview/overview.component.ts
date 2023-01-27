import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { MatCardModule } from '@angular/material/card';
// import { NgxEchartsModule, NgxEchartsDirective } from 'ngx-echarts/';
// import { AgChartsAngularModule } from 'ag-charts-angular';
import { MatIconModule } from '@angular/material/icon';
// import { ListProductUnderThresholdComponent } from 'src/app/ui/modules/product-ku/list-product-under-threshold/list-product-under-threshold.component';
import { OmzetChartComponent } from './components/omzet-chart/omzet-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ListProductUnderThresholdComponent } from 'src/app/ui/modules/product-ku/list-product-under-threshold/list-product-under-threshold.component';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // FlexLayoutModule,
    MatCardModule,
    // AgChartsAngularModule,
    MatIconModule,
    ListProductUnderThresholdComponent,
    OmzetChartComponent,
    // NgxEchartsModule
    // NgxEchartsModule.forRoot({
    //   echarts: () => import('echarts')
    // })
  ]
})
export class OverviewComponent implements OnInit, AfterContentInit {
  listCards=[
    {
      title:'Total Kategori Barang',
      n:46,
      icon:'category'
    },
    {
      title:'Total Barang Sekarang',
      n:450,
      icon:'inventory'
    },
    {
      title:'Total Karyawan',
      n:4,
      icon:'supervisor_account'
    },
    {
      title:'Total Pelanggan',
      n:21,
      icon:'diversity_1'
    },
    {
      title:'Total Supplier Yang Diikuti',
      n:10,
      icon:'local_shipping'
    }
  ];
  optionsSalesOnAnonymous:any;
  optionsSales: any;
  optionsNProductPerCategory: any;
  optionsNEmployeePerRole:any;
  dataSalesOnAnonymous=[
    {
      type:'Anonymous',
      n:353
    },
    {
      type:'Pelanggan',
      n:45
    }
  ]
  dataNEmployeePerRole = [
    {
      role:'Cashier',
      n:3
    },
    {
      role:'Lifter',
      n:8
    }
  ];
  dataNProductPerCategory=[
    {
      category:'Makanan dan Minuman',
      n:12
    },
    {
      category:'Rokok',
      n:20
    },
    {
      category:'Dapur',
      n:10
    },
    {
      category:'Perabot',
      n:4
    }
  ];
  dataSales = [
        {
            month: 'Januari',
            sales: 450,
        },
        {
            month: 'Februari',
            sales: 560,
        },
        {
            month: 'Maret',
            sales: 600,
        },
        {
            month: 'April',
            sales: 700,
        },
        {
          month: 'Mei',
          sales: 700,
        },
        {
          month: 'Juni',
          sales: 700,
        },
        {
          month: 'Juli',
          sales: 700,
        },
        {
          month: 'Agustus',
          sales: 700,
        },
        {
          month: 'September',
          sales: 700,
        },
        {
          month: 'Oktober',
          sales: 0,
        },
        {
          month: 'November',
          sales: 0,
        },
        {
          month: 'Desember',
          sales: 0,
        },
      
  ];
  constructor(
    private dashboardStateService: DashboardStateService
  ) {
    this.optionsSalesOnAnonymous={
      data:this.dataSalesOnAnonymous,
      title:{
        text:'Penjualan Berdasarkan Pembeli'
      },
      series: [{
        type: 'column',
        xKey: 'type',
        yKey: 'n',
        yName:'Total'
      }],
    }
    this.optionsNEmployeePerRole ={
      data:this.dataNEmployeePerRole,
      title:{
        text:'Pegawai'
      },
      subtitle:{
        text:'per peran'
      },
      series: [{
        type: 'pie',
        labelKey: 'role',
        angleKey: 'n',
      }],
      // legend: {
      //   position: 'bottom',
      // },
    };
    this.optionsNProductPerCategory ={
      data:this.dataNProductPerCategory,
      title:{
        text:'Produk'
      },
      subtitle:{
        text:'per kategori'
      },
      series: [{
        type: 'pie',
        labelKey: 'category',
        angleKey: 'n',
        innerRadiusOffset: -70
      }],
      // legend: {
      //   position: 'bottom',
      // },
    };
    this.optionsSales = {
      data: this.dataSales,
      title: {
          text: 'Sales Toko',
      },
      subtitle: {
          text: 'per bulan',
      },
      series: [{
          xKey: 'month',
          yKey: 'sales',
          yName:'Jumlah Sales Per Bulan'
      }],
      legend: {
          position: 'bottom',
      },
    };
  }
  ngAfterContentInit(): void {
    // this.chart.chart.canvas.;
  }

  ngOnInit(): void {
    this.dashboardStateService.changeViewState({currentTab: 'Overview', isFooterBarNeedToBeShown: false});
  }

}
