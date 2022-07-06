import { ISymbolSearchResponse } from "./symbolSearchResponse.model";

export class Company {
    description?: string;
    displaySymbol?: string;
    symbol?: string;
    type?: string;

    constructor(object: Company) {
        this.description = object.description;
        this.displaySymbol = object.displaySymbol;
        this.symbol = object.symbol;
        this.type = object.type;
    }

}