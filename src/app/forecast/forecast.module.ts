import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForecastPage } from './forecast.page';

import { ForecastPageRoutingModule } from './forecast-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ForecastPageRoutingModule],
  declarations: [ForecastPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ForecastPageModule {}
