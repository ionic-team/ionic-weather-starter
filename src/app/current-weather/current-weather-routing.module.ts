import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherPage } from './current-weather.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentWeatherPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentWeatherPageRoutingModule {}
