import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {

  // private apiUrl: string = 'https://api.openweathermap.org/data/2.5';
  // private apiKey = "5a4b2d457ecbef9eb2a71e480b947604";

  constructor(private http: HttpClient) { }

  // private getEndpoint(resource: string): string {
  //   return `${this.apiUrl}/${resource}`;
  // }
  getStockStore(): Array<string> {
    return JSON.parse(localStorage.getItem('stock') || "[]");
  }

  saveZipcodesStore(stock: Array<string>): void {
    localStorage.setItem('stock', JSON.stringify(stock));
  }

  // deleteZipcodeStore(zipcode: number): void {
  //   let zipcodes = this.getZipcodesStore();
  //   zipcodes = zipcodes.filter((element: number) => element !== zipcode);
  //   this.saveZipcodesStore(zipcodes);
  // }

  // getWeatherData(zipcode: number): Observable<WeatherMapResponse> {
  //   const specificEndPoint = 'weather';
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams
  //     .append("zip", zipcode)
  //     .append("appid", this.apiKey)
  //     .append("units", 'imperial');

  //   return this.http.get(this.getEndpoint(specificEndPoint), { params: queryParams });
  // }

  // getForecastByZipcode(zipcode: number) {
  //   const specificEndPoint = 'forecast/daily';
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams
  //     .append("cnt", 5)
  //     .append("zip", zipcode)
  //     .append("appid", this.apiKey)
  //     .append("units", 'imperial');

  //   return this.http.get(this.getEndpoint(specificEndPoint), { params: queryParams });
  // }
}
