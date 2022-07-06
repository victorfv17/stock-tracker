import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockTrackerModule } from './stock-tracker/stock-tracker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StockTrackerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
