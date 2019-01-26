import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'current-weather',
        children: [
          {
            path: '',
            loadChildren: '../current-weather/current-weather.module#CurrentWeatherPageModule'
          }
        ]
      },
      {
        path: 'forecast',
        children: [
          {
            path: '',
            loadChildren: '../forecast/forecast.module#ForecastPageModule'
          }
        ]
      },
      {
        path: 'uv-index',
        children: [
          {
            path: '',
            loadChildren: '../uv-index/uv-index.module#UvIndexPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/current-weather',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/current-weather',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
