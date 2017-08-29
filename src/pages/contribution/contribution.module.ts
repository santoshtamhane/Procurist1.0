import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContributionPage } from './contribution';

@NgModule({
  declarations: [
    ContributionPage,
  ],
  imports: [
    IonicPageModule.forChild(ContributionPage),
  ],
  exports: [
    ContributionPage
  ]
})
export class ContributionPageModule {}
