import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZipcodeComponent } from './zipcode.component';
import { ZIPCODE_ROUTE_ROOT } from './zipcode.route';


const routes: Routes = [
  {
    path:       ZIPCODE_ROUTE_ROOT, 
    component:  ZipcodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZipcodeRoutingModule { }
