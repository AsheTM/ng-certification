import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForecastComponent } from './forecast.component';
import { FORECAST_ROUTE_ROOT } from './forecast.route';


const routes: Routes = [
  { path: FORECAST_ROUTE_ROOT, component: ForecastComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastRoutingModule { }
