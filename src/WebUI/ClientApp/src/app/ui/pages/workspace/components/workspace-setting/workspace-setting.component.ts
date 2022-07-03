/// <reference types="w3c-web-serial" />
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { PRINTER_CONNECTION, BLUETOOTH_CONNECTION, TEST_PRINTER_TEXT } from 'src/app/application/constant';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { BleDriver } from 'src/app/ui/components/utility/additional-ng-thermal-print/BleDriver';
import { SerialDriver } from 'src/app/ui/components/utility/additional-ng-thermal-print/SerialDriver';
// import { BleDriver } from 'src/app/components/additional-ng-thermal-print/BleDriver';
// import { SerialDriver } from 'src/app/components/additional-ng-thermal-print/SerialDriver';
// import { PopUpNotifService } from 'src/app/components/pop-up-ku/pop-up-ku-notif/pop-up-ku-notif.service';
// import { BLUETOOTH_CONNECTION, PRINTER_CONNECTION, TEST_PRINTER_TEXT } from 'src/app/shared/values';
type rr = {
  devices: any,
  server: any,
  services: any,
  char: any,
  error: any
};

@Component({
  selector: 'app-workspace-setting',
  templateUrl: './workspace-setting.component.html',
  styleUrls: ['./workspace-setting.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class WorkspaceSettingComponent implements OnInit {
  @ViewChild('printerConSelected') printerConSelected!: MatSelect;
  bluetoothTypeSelected!: string;

  connectionStatus = false;
  printerName = '';
  printerConnection = PRINTER_CONNECTION;
  bluetoothConnection = BLUETOOTH_CONNECTION;
  usbPrintDriver!: UsbDriver;
  serialPrintDriver!: SerialDriver;
  blePrintDriver!: BleDriver;

  webPrintDriver!: WebPrintDriver;
  ip = '';
  bleDescription = this.formBuilder.group({
    service: this.formBuilder.nonNullable.control<string|number>('', Validators.required),
    characteristic: this.formBuilder.nonNullable.control<string|number>('', Validators.required),
  });

  isSerialAvailable = false;
  isBluetoothAvailable = false;
  isUSBAvailable = false;


  port!: SerialPort;
  writer!: any;
  ble: rr = {
    char: null,
    devices: null,
    server: null,
    services: null,
    error: null
  };


  constructor(
    private formBuilder: FormBuilder,
    private printService: PrintService,
    private notifService: PopUpNotifService
    ) {
      if ('serial' in navigator){
        this.isSerialAvailable = true;
      }
      if ('bluetooth' in navigator){
        this.isBluetoothAvailable = true;
      }
      if ('usb' in navigator){
        this.isUSBAvailable = true;
      }
      this.printService.isConnected.subscribe(result => {
          this.connectionStatus = result;
          if (result) {
            console.log('Connected to printer!!!');
          } else {
            console.log('Not connected to printer.');
          }
      });
  }

  ngOnInit(): void {
  }

  connect(): void{
    if (this.printerConSelected.value === this.printerConnection.Bluetooth){
      if (!this.bluetoothTypeSelected){
        this.notifService.show({message: 'Silahkan pilih jenis bluetooth terlebih dahulu.', title: 'Peringatan!', type: 'warning'});
      }
      else if (this.bluetoothTypeSelected === this.bluetoothConnection.Serial){
        this.requestSerial();
      }else if (this.bluetoothTypeSelected === this.bluetoothConnection.BLE){
        this.requestBLE();
      }
      else{
        this.notifService.show({message: 'Jenis bluetooth tidak dikenal.', title: 'Peringatan!', type: 'warning'});
      }
    }else if (this.printerConSelected.value === this.printerConnection.USB){
      this.requestUsb();
    }else if (this.printerConSelected.value === this.printerConnection.Network){

    }else{
      this.notifService.show({message: 'Silahkan pilih koneksi printer terlebih dahulu.', title: 'Peringatan!', type: 'warning'});
    }
  }
  disconnect(): void{
    this.connectionStatus = false;
    this.printService.setDriver(new UsbDriver(undefined, undefined), undefined);
  }

  requestSerial(): void{
    this.serialPrintDriver = new SerialDriver();
    this.serialPrintDriver.requestPort().subscribe((result: SerialPort) => {
      console.log(result, result.getInfo());
      this.printerName = 'Tidak diketahui';
      this.printService.setDriver(this.serialPrintDriver, 'ESC/POS');
    });
  }

  requestUsb(): void {
    this.usbPrintDriver = new UsbDriver();
    this.usbPrintDriver.requestUsb().subscribe(result => {
      this.printerName = result.productName! ?? result.manufacturerName!;
      this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    });
  }

  connectToWebPrint(): void {
      this.webPrintDriver = new WebPrintDriver(this.ip);
      this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
  }
  requestBLE(): void{
    this.blePrintDriver = new BleDriver();
    const s = this.bleDescription.controls.service.value;
    const c = this.bleDescription.controls.characteristic.value;
    this.blePrintDriver.requestDevice(s, c).subscribe(result => {
      this.printerName = result.name! ?? 'Tidak diketahui';
      this.printService.setDriver(this.blePrintDriver, 'ESC/POS');
    });
  }

  private convertDescription(s: string): string|number{
    if (s.includes('-')){
      console.log('- :=>', s);
      return s;
    }else{
      let ss!: any;
      if (s.substr(0, 2).includes('0x')){
        ss = s.substr(2);
        console.log('0x:=>', s, ss);
      }
      else{
        ss = s;
        console.log(':=>', s, ss);
      }
      return parseInt(ss, 16);
    }
  }

  testPrinter(): void {
      this.printService.init()
          .setJustification('center')
          .setBold(true)
          .setSize('large')
          .writeLine(TEST_PRINTER_TEXT.APP)
          .setBold(true)
          .setSize('normal')
          .writeLine(TEST_PRINTER_TEXT.BANNER)
          .setBold(false)
          .feed(4)
          .cut('full')
          .flush();
  }

  objtostr(obj: any): string{
    let a = '';
    console.log(JSON.stringify(obj));
    // tslint:disable-next-line:forin
    for (const key in obj) {
      if (!key.includes('_')){
        // if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        a = a + `<u>${key}</u> : ${element} <br/>`;
        // }
      }
    }
    console.log(a);
    return a;
  }

}
