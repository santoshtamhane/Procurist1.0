import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchQueryPage } from './search-query';

@NgModule({
  declarations: [
    SearchQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchQueryPage),
  ],
  exports: [
    SearchQueryPage
  ]
})
export class SearchQueryPageModule {}
