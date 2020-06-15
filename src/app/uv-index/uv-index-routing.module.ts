import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UvIndexPage } from './uv-index.page';

const routes: Routes = [
  {
    path: '',
    component: UvIndexPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UvIndexPageRoutingModule {}
