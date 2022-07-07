import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './stock-tracker/components/add-stock/add-stock.component';
import { SentimentComponent } from './stock-tracker/components/sentiment/sentiment.component';

const routes: Routes = [
  {
    path: '',
    component: AddStockComponent,
    pathMatch: 'full'
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
