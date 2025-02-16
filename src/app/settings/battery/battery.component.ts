import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BatteryTypeComponent} from '../battery-type/battery-type.component';
import {PickerController, PopoverController, ToastController} from '@ionic/angular';
import {PickerOptions} from '@ionic/core/dist/types/components/picker/picker-interface';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss'],
})
export class BatteryComponent implements OnInit {

  batteryPresets: any;
  toast: any;
  @Input() rescueConf: any;
  @Output() changeEvent = new EventEmitter<{ key: string, value: string }>();

  constructor(
    private popoverController: PopoverController,
    private pickerController: PickerController,
    private toastController: ToastController,
    private logger: NGXLogger) {
    this.batteryPresets = {
      minVoltage: 40.0,
      maxVoltage: 50.4,
      lowVoltage: 42.0
    };
  }

  ngOnInit() {
  }

  async changeBatteryType(event) {
    const popover = await this.popoverController.create({
      //event,
      component: BatteryTypeComponent,
      translucent: true
    });
    popover.present();

    const {data} = await popover.onDidDismiss();
    this.rescueConf.batteryType = data.battery;
    this.batteryPresets = {
      minVoltage: (data.batteryCells * 3.3333).toFixed(1),
      maxVoltage: (data.batteryCells * 4.2).toFixed(1),
      lowVoltage: (data.batteryCells * 3.5).toFixed(1)
    };
    this.rescueConf.minBatteryVoltage = this.batteryPresets.minVoltage;
    this.rescueConf.lowBatteryVoltage = this.batteryPresets.lowVoltage;
    this.rescueConf.maxBatteryVoltage = this.batteryPresets.maxVoltage;
    this.logger.debug('Selected BatteryType: ' + this.rescueConf.batteryType);
    this.ngOnInit();
  }

  async showPicker() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Done'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
      columns: [
        {
          name: 'full',
          options: [
            {
              text: 'bla',
              value: 'bla'
            },
            {
              text: 'blubb',
              value: 'blubb'
            }
          ]
        }
      ]
    };
    const picker = await this.pickerController.create(opts);
    await picker.present();
  }

  checkValues() {
    if (this.rescueConf.lowBatteryVoltage <= this.rescueConf.minBatteryVoltage) {
      this.showWarning('Battery values incorrect!',
        'The low battery value is lower than the min battery value.');
    }
    if (this.rescueConf.lowBatteryVoltage >= this.rescueConf.maxBatteryVoltage) {
      this.showWarning('Battery values incorrect!',
        'The low battery value is greater than the max battery value.');
    }
    if (this.rescueConf.minBatteryVoltage >= this.rescueConf.maxBatteryVoltage) {
      this.showWarning('Battery values incorrect!',
        'The min battery value is greater than the max battery value.');
    }
  }

  async showWarning(header: string, message: string) {
    this.toast = await this.toastController.create({
      header,
      message,
      color: 'warning',
      position: 'bottom',
      duration: 5000
    });
    await this.toast.present();
  }

  changeLightbarMaxBrightness(event) {
    this.rescueConf.lightbarMaxBrightness = event.detail.value;
    this.changeEvent.emit({key: 'lightbarMaxBrightness', value: event.detail.value});
  }

  changeLightbarTurnOffErpm(event) {
    this.rescueConf.lightbarTurnOffErpm = event.detail.value;
    this.changeEvent.emit({key: 'lightbarTurnOffErpm', value: event.detail.value});
  }
}
