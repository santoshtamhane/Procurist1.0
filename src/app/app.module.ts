import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContributionPage } from '../pages/contribution/contribution';
import { IntroPage } from '../pages/intro/intro';
import {ContactListPage} from '../pages/contact-list/contact-list';
import {SearchQueryPage} from '../pages/search-query/search-query';
import {ContactDetailPage} from '../pages/contact-detail/contact-detail';
import {SearchResultPage} from '../pages/search-result/search-result';
import { RatePage } from '../pages/rate/rate';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import { AuthProvider } from '../providers/auth/auth';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EmailProvider } from '../providers/email/email';
import { IonRatingComponent } from '../components/ion-rating/ion-rating';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '36c22be3'
  }
};
export const firebaseConfig = {
  apiKey: "AIzaSyBlbQM0dpIEgbS5on9xfvSh0s1onr7Y0RU",
    authDomain: "procurist-d69ec.firebaseapp.com",
    databaseURL: "https://procurist-d69ec.firebaseio.com",
    projectId: "procurist-d69ec",
    storageBucket: "procurist-d69ec.appspot.com",
    messagingSenderId: "989869574552"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserProfilePage,
    ContributionPage,
    RatePage,
    IntroPage,
    ContactListPage,
    ContactDetailPage,
    SearchQueryPage,
    SearchResultPage,
    IonRatingComponent
  ],
  imports: [
    BrowserModule,
     IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
     CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig),
  AngularFireDatabaseModule,
   AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserProfilePage,
    ContributionPage,
    IntroPage,
    RatePage,
    ContactListPage,
    SearchQueryPage,
    ContactDetailPage,
    SearchQueryPage,
    SearchResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    EmailProvider
  ]
})
export class AppModule {}
