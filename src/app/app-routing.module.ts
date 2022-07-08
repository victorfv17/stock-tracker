import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock',
    pathMatch: 'full'
  },
  {
    path: 'stock',
    loadChildren: () => import('./stock-tracker/stock-tracker.module').then(x => x.StockTrackerModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
