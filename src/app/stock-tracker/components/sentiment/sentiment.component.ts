import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sentiment } from '../../models/sentimentResponse.model';
import { StockTrackerService } from '../../services/stock-tracker.service';
import { Location } from '@angular/common';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
/* STEP 3 */
export class SentimentComponent implements OnInit {
  listSentiment: Array<Sentiment> = [];
  companyName: string = "";
  symbol: string = "";
  public isLoading: boolean = true;

  constructor(public stockTrackerService: StockTrackerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.symbol = this.route.snapshot.params['symbol'];
    this.fetchSentimentData();
  }

  private fetchSentimentData(): void {
    this.stockTrackerService.getSentiment(this.symbol).subscribe({
      next: (sentimentData: Array<Sentiment>) => {
        if (sentimentData.length > 0) {
          this.listSentiment = sentimentData;
          this.listSentiment.map((element: Sentiment) => { element.date = `${element?.year}-${element?.month}-01` });
          this.getCompanySubject();
        }
      },
      error: (error: ErrorEvent) => {
        if (error) {
          alert(error.error.message);
        }
      }
    });
  }
  private getCompanySubject(): void {
    this.stockTrackerService.subject.subscribe((company: string) => {
      if (company) {
        this.companyName = company;
        this.isLoading = false;
      } else {
        this.fetchCompany();
      }
    });
  }
  private fetchCompany(): void {
    this.isLoading = true;
    this.stockTrackerService.getCompanyName(this.symbol).subscribe({
      next: (companyData: Company) => {
        if (companyData.description) {
          this.companyName = companyData.description;
          this.isLoading = false;
        }
      },
      error: (error: ErrorEvent) => {
        if (error) {
          this.isLoading = false;
          alert(error.error.message);
        }
      }
    });
  }

  public goToBack(): void {
    this.location.back();
  }

}
