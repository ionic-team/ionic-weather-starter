import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UvIndexPage } from './uv-index.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UvIndexPageRoutingModule } from './uv-index-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: UvIndexPage }]),
    UvIndexPageRoutingModule,
  ],
  declarations: [UvIndexPage]
})
export class UvIndexPageModule {}
