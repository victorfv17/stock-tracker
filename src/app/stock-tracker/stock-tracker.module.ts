import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { CurrentPriceDataComponent } from './components/current-price-data/current-price-data.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { RouterModule } from '@angular/router';
import { StockTrackerRoutingModule } from './stock-tracker-routing.module';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@NgModule({
  declarations: [AddStockComponent, CurrentPriceDataComponent, SentimentComponent, SpinnerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    StockTrackerRoutingModule

  ]
})
export class StockTrackerModule { }
