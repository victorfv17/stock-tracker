import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { IQuoteResponse } from '../models/quoteResponse.model';
import { Stock } from '../models/stock.model';
import { ISymbolSearchResponse } from '../models/symbolSearchResponse.model';
import * as moment from 'moment';
import { ISentimentResponse, Sentiment } from '../models/sentimentResponse.model';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {
  private apiUrl: string = 'https://finnhub.io/api/v1';
  private apiKey = "bu4f8kn48v6uehqi3cqg";
  public subject = new BehaviorSubject('');
  public arrow: string = "";
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

  sendData(companyName: string): void {
    this.subject.next(companyName);
  }

  public percentControl(change: number): boolean {
    if (change >= 0) {
      this.arrow = "🡹";
      return true;
    }
    this.arrow = "🡻";
    return false;
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

  getSentiment(symbol: string): Observable<Array<Sentiment>> {

    const specificEndPoint = 'stock/insider-sentiment';
    let queryParams = new HttpParams();
    const today = Date.now();
    const todayFormatted = moment(today).format('YYYY-MM-DD');

    const date = moment();

    const dateIn5Months = date.add(-3, 'months');
    const strDate = dateIn5Months.format('YYYY-MM-DD');

    queryParams = queryParams
      .append("symbol", symbol)
      .append("token", this.apiKey)
      .append("from", strDate)
      .append("to", todayFormatted);

    return this.http.get<ISentimentResponse>(this.getEndpoint(specificEndPoint), { params: queryParams })
      .pipe(map(
        (res: ISentimentResponse) => { return res.data })
      );
  }


}
