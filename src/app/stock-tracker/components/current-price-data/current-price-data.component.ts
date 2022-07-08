import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../models/company.model';
import { Stock } from '../../models/stock.model';
import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-current-price-data',
  templateUrl: './current-price-data.component.html',
  styleUrls: ['./current-price-data.component.css']
})
export class CurrentPriceDataComponent implements OnInit {
  @Input() stock: Array<string> = [];
  public isLoading: boolean = true;
  listStock: Array<Stock> = [];

  constructor(
    public stockTrackerService: StockTrackerService,
    private router: Router
  ) { }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['stock']) {
      this.fetchSymbolData();
    }

  }

  private fetchSymbolData(): void {
    this.isLoading = true;
    this.listStock = [];
    this.stock = this.stockTrackerService.getStockStore();
    if (this.stock.length > 0) {
      this.stock.forEach((symbol: string) => {
        this.stockTrackerService.getStockData(symbol).subscribe({
          next: (stockData: Stock) => {
            this.fetchCompany(symbol, stockData);
          },
          error: (error: ErrorEvent) => {
            if (error) {
              this.isLoading = false;
              alert(error.error.message);
            }
          }

        });
      });
    }
  }

  private fetchCompany(symbol: string, stockData: Stock) {
    this.stockTrackerService.getCompanyName(symbol).subscribe({
      next: (companyData: Company) => {
        stockData.company = companyData;
        this.listStock.push(stockData);
        this.isLoading = false;
      },
      error: (error: ErrorEvent) => {
        if (error) {
          this.isLoading = false;
          alert(error.error.message);
        }
      }
    });
  }

  public deleteStock(symbol: string): void {
    this.stockTrackerService.deleteStockStore(symbol);
    this.listStock = this.listStock.filter((stock: Stock) => stock.company?.symbol !== symbol);
  }

  public goToSentiment(company?: Company) {
    if (company && company.description) {
      this.stockTrackerService.sendData(company.description);
      this.router.navigate(['/sentiment', company.symbol]);
    }

  }
}
