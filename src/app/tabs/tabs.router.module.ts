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
            loadChildren: () => import('../current-weather/current-weather.module').then(m => m.CurrentWeatherPageModule)
          }
        ]
      },
      {
        path: 'forecast',
        children: [
          {
            path: '',
            loadChildren: () => import('../forecast/forecast.module').then(m => m.ForecastPageModule)
          }
        ]
      },
      {
        path: 'uv-index',
        children: [
          {
            path: '',
            loadChildren: () => import('../uv-index/uv-index.module').then(m => m.UvIndexPageModule)
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
