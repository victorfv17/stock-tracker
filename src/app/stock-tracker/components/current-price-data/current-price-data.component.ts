import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Company } from '../../models/company.model';
import { IQuoteResponse } from '../../models/quoteResponse.model';
import { Stock } from '../../models/stock.model';
import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-current-price-data',
  templateUrl: './current-price-data.component.html',
  styleUrls: ['./current-price-data.component.css']
})
export class CurrentPriceDataComponent implements OnInit {
  @Input() stock: Array<string> = [];
  listStock: Stock = {};
  constructor(private stockTrackerService: StockTrackerService) { }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['stock']) {
      this.fetchWeatherData();
    }

  }


  fetchWeatherData() {

    this.stock = this.stockTrackerService.getStockStore();
    if (this.stock.length > 0) {
      this.stock.forEach((symbol: string) => {

        this.stockTrackerService.getStockData(symbol).subscribe((stockData: Stock) => {
          // this.mapWeatherData(weatherData, symbol);
          this.listStock = stockData;
          this.stockTrackerService.getCompanyName(symbol).subscribe((companyData: Company) => {
            this.listStock.company = companyData;
          });
        }, error => {
          if (error) {
            // this.stockTrackerService.deleteZipcodeStore(symbol);
            // alert(error.error.message);
          }
        });
      });
    }
  }


  // private mapWeatherData(weatherData: WeatherMapResponse, zipcode: number) {
  //   if (weatherData) {
  //     weatherData.zipcode = zipcode;
  //     if (weatherData.weather && weatherData.weather.length > 0) {
  //       weatherData.weather[0].main = weatherData.weather[0].main?.toLowerCase();
  //     }
  //     this.listWeather.push(weatherData);
  //   }
  // }

  // public deleteLocation(symbol: string | undefined) {
  //   this.stock = this.stock.filter((element: string) => element !== symbol);
  //   this.listWeather = this.listWeather.filter((stock: WeatherMapResponse) => stock.symbol !== symbol);
  //   this.stockTrackerService.saveZipcodesStore(this.stock);
  // }

}
