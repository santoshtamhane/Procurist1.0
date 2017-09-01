import { Component,ViewChild } from '@angular/core';
import { Platform,MenuController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { SearchQueryPage } from '../pages/search-query/search-query';
import { ContributionPage } from '../pages/contribution/contribution';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  rootPage:any;
 pages: Array<{title: string, component: any,icon:string}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,afAuth: AngularFireAuth,public menu: MenuController,) {
      const authListener = afAuth.authState.subscribe( user => {
if (user){
this.rootPage = HomePage;
authListener.unsubscribe();
} else {
this.rootPage = 'login';
authListener.unsubscribe();
}
});

// used for an example of ngFor and navigation
    this.pages = [
      { title: '  My Profile', component: UserProfilePage,icon:'person' },
       { title: '  My Contributions', component: ContributionPage,icon:'share' },
      { title: '  Search', component: SearchQueryPage,icon:'search' }
          ];
   


  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
     
      splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

