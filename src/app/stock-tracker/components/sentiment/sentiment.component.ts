import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sentiment } from '../../models/sentimentResponse.model';
import { StockTrackerService } from '../../services/stock-tracker.service';
import { Location } from '@angular/common';

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
  constructor(public stockTrackerService: StockTrackerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.symbol = this.route.snapshot.params['symbol'];
    this.stockTrackerService.subject.subscribe((company) => {
      if (company) {
        this.companyName = company;
      }
    });
    this.fetchSentimentData();
  }

  private fetchSentimentData(): void {
    this.stockTrackerService.getSentiment(this.symbol).subscribe((sentimentData: Array<Sentiment>) => {
      if (sentimentData.length > 0) {
        this.listSentiment = sentimentData
        this.listSentiment.map((element) => { element.date = `${element?.year}-${element?.month}-01` });
      }
    });
  }

  public goToBack(): void {
    this.location.back();
  }

}
