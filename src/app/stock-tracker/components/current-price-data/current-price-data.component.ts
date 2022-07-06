import { ThisReceiver } from '@angular/compiler';
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
  listStock: Array<Stock> = [];
  arrow: any;
  constructor(private stockTrackerService: StockTrackerService) { }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['stock']) {
      this.fetchWeatherData();
    }

  }


  private fetchWeatherData(): void {
    this.listStock = [];
    this.stock = this.stockTrackerService.getStockStore();
    if (this.stock.length > 0) {
      this.stock.forEach((symbol: string) => {
        this.stockTrackerService.getStockData(symbol).subscribe((stockData: Stock) => {
          this.stockTrackerService.getCompanyName(symbol).subscribe((companyData: Company) => {
            stockData.company = companyData;
            this.listStock.push(stockData);
          });
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

  public deleteStock(symbol: string | undefined): void {
    this.stock = this.stock.filter((element: string) => element !== symbol);

    this.stockTrackerService.saveStockStore(this.stock);
    this.listStock = this.listStock.filter((stock: Stock) => stock.company?.symbol !== symbol);
  }

  public percentControl(percentChange: number): boolean {
    if (percentChange >= 0) {
      this.arrow = "🡹";
      return true;
    }
    this.arrow = "🡻";
    return false;
  }
}
