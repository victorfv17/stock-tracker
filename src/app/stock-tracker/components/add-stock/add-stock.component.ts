import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
/*STEP 1*/
export class AddStockComponent implements OnInit {
  stock: Array<string> = []
  stockForm: FormGroup = this.fb.group({
    symbol: [, [Validators.required, Validators.pattern('[A-Za-z]{1,5}')]]
  });
  constructor(
    private fb: FormBuilder,
    private stockTrackerService: StockTrackerService) { }

  ngOnInit(): void {
  }

  addStock() {
    if (this.stockForm.valid) {
      this.stock = this.stockTrackerService.getStockStore();
      if (!this.existsInStore()) {
        this.stock.push(this.stockForm.value.symbol);
        this.stockTrackerService.saveZipcodesStore(this.stock);
      } else {
        this.stockForm.controls['symbol'].setErrors({ 'symbolExists': true });
      }
    }
  }

  private existsInStore(): boolean {
    return this.stock.includes(this.stockForm.value.symbol);
  }

  public symbolInvalid(campo: string, error: string): boolean {
    const control = this.stockForm.controls[campo];
    return control.errors && control.errors![error]
      && this.stockForm.controls[campo].touched || false;
  }

}
