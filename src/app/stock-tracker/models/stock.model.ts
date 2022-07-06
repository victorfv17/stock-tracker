import { Company } from "./company.model";
import { IQuoteResponse } from "./quoteResponse.model";

export class Stock {
    currentPrice?: number;
    change?: number;
    percentChange?: number;
    highPrice?: number;
    lowPrice?: number;
    openPrice?: number;
    previousClosePrice?: number;
    company?: Company;
    // name?: string;
    // symbol?: string;

    constructor(object?: IQuoteResponse) {
        this.currentPrice = object?.c;
        this.change = object?.d;
        this.percentChange = object?.dp;
        this.highPrice = object?.h;
        this.lowPrice = object?.l;
        this.openPrice = object?.o;
        this.previousClosePrice = object?.pc;
    }

}