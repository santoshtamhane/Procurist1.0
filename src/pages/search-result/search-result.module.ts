import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultPage } from './search-result';

@NgModule({
  declarations: [
    SearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultPage),
  ],
  exports: [
    SearchResultPage
  ]
})
export class SearchResultPageModule {}
