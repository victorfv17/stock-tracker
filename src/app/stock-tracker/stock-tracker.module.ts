import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddStockComponent } from './components/add-stock/add-stock.component';
import { CurrentPriceDataComponent } from './components/current-price-data/current-price-data.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [AddStockComponent, CurrentPriceDataComponent, SentimentComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class StockTrackerModule { }
