import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivedataPageRoutingModule } from './livedata-routing.module';

import { LivedataPage } from './livedata.page';
import {NgApexchartsModule} from 'ng-apexcharts';
import {ChartsModule} from '../charts/charts.module';
import {MapComponent} from '../components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivedataPageRoutingModule,
    NgApexchartsModule,
    ChartsModule,
  ],
    declarations: [LivedataPage, MapComponent]
})
export class LivedataPageModule {}
