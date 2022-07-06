import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { IQuoteResponse } from '../models/quoteResponse.model';
import { Stock } from '../models/stock.model';
import { ISymbolSearchResponse } from '../models/symbolSearchResponse.model';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {
  private apiUrl: string = 'https://finnhub.io/api/v1';
  private apiKey = "bu4f8kn48v6uehqi3cqg";

  constructor(private http: HttpClient) { }

  private getEndpoint(resource: string): string {
    return `${this.apiUrl}/${resource}`;
  }
  getStockStore(): Array<string> {
    return JSON.parse(localStorage.getItem('stock') || "[]");
  }

  saveStockStore(stock: Array<string>): void {
    localStorage.setItem('stock', JSON.stringify(stock));
  }

  deleteStockStore(symbol: string): void {
    let stock = this.getStockStore();
    stock = stock.filter((element: string) => element !== symbol);
    this.saveStockStore(stock);
  }

  getStockData(symbol: string): Observable<Stock> {
    const specificEndPoint = 'quote';
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append("symbol", symbol)
      .append("token", this.apiKey);
    // .append("units", 'imperial');

    return this.http.get<IQuoteResponse>(this.getEndpoint(specificEndPoint), { params: queryParams })
      .pipe(map((res: IQuoteResponse) => { return new Stock(res) }));
  }
  getCompanyName(symbol: string): Observable<Company> {
    const specificEndPoint = 'search';
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append("q", symbol)
      .append("token", this.apiKey);

    return this.http.get<ISymbolSearchResponse>(this.getEndpoint(specificEndPoint), { params: queryParams })
      .pipe(map((res: ISymbolSearchResponse) => { return new Company(res.result[0]) }));
  }

  getForecastByZipcode(zipcode: number) {
    const specificEndPoint = 'search/daily';
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append("cnt", 5)
      .append("zip", zipcode)
      .append("appid", this.apiKey)
      .append("units", 'imperial');

    return this.http.get(this.getEndpoint(specificEndPoint), { params: queryParams });
  }
}
