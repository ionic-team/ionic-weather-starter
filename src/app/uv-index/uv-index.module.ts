import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UvIndexPage } from './uv-index.page';

import { UvIndexPageRoutingModule } from './uv-index-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, UvIndexPageRoutingModule],
  declarations: [UvIndexPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UvIndexPageModule {}
