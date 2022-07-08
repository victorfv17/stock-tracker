import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

const routes: Routes = [
  {
    path: '',
    component: AddStockComponent,
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTrackerRoutingModule { }
