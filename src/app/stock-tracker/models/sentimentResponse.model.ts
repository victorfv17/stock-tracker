export interface ISentimentResponse {
    data: Array<Sentiment>;

}

export class Sentiment {
    symbol?: string;
    year?: number;
    month?: number;
    change?: number;
    mspr?: number;
    date?: string;
    constructor(sentiment?: Sentiment) {
        this.symbol = sentiment?.symbol;
        this.year = sentiment?.year;
        this.month = sentiment?.month;
        this.change = sentiment?.change;
        this.mspr = sentiment?.mspr;
    }
}