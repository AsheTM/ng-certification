import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZipcodeCountriesResolver } from './zipcode-countries.resolver';
import { ZipcodeComponent } from './zipcode.component';
import { ZIPCODE_CONSTANT_RESOLVER_COUNTRIES } from './zipcode.constant';
import { ZIPCODE_ROUTE_ROOT } from './zipcode.route';


const routes: Routes = [
  {
    path:       ZIPCODE_ROUTE_ROOT, 
    component:  ZipcodeComponent, 
    resolve:    {
      [ZIPCODE_CONSTANT_RESOLVER_COUNTRIES]:  ZipcodeCountriesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZipcodeRoutingModule { }
