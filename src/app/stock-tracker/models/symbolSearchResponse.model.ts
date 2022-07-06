import { Company } from "./company.model";

export interface ISymbolSearchResponse {
    count: number;
    result: Array<Company>;
}

