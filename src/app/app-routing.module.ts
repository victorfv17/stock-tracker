import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './stock-tracker/components/add-stock/add-stock.component';

const routes: Routes = [
  {
    path: '',
    component: AddStockComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'forecast/:zipcode',
  //   component: ForecastComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
