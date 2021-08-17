import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {
    APP_ROUTE_ROOT, 
    APP_ROUTE_FEATURE_FORECAST, 
    APP_ROUTE_FEATURE_ZIPCODE, 
    APP_ROUTE_REDIRECT_TO, 
    APP_ROUTE_WILDCARD
} from './app.route';

import { environment } from 'src/environments';


const routes: Route[] = [
    {
        path:       APP_ROUTE_ROOT, 
        component:  AppComponent, 
        children:   [
            { path: APP_ROUTE_FEATURE_ZIPCODE,  loadChildren: () => import('./zipcode').then(m => m.ZipcodeModule) }, 
            { path: APP_ROUTE_FEATURE_FORECAST, loadChildren: () => import('./forecast').then(m => m.ForecastModule) }
        ]
    }, {
        path:       APP_ROUTE_WILDCARD, 
        redirectTo: APP_ROUTE_REDIRECT_TO
    }
]

@NgModule({
  imports:  [RouterModule.forRoot(routes, {
        enableTracing: !environment.production
  })], 
  exports:  [RouterModule]
})
export class AppRoutingModule { }
