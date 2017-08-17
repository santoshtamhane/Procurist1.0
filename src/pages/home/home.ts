import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ContactListPage} from '../../pages/contact-list/contact-list';
import {SearchQueryPage} from '../../pages/search-query/search-query';
//import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../../pages/intro/intro';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username:any;
  constructor(public navCtrl: NavController,public storage:Storage,public authData:AuthProvider) {

      
  }
    launchContribution(){  
      this.navCtrl.push(ContactListPage);
    }
    launchSearch(){
      this.navCtrl.push(SearchQueryPage);
      
    }
    launchDiscussion(){
      
    }
    starClicked(value){
   console.log("rating home:", value);
}
ionViewDidLoad() {
  this.storage.get('intro-done').then(done => {
    if (!done) {
     //this.storage.set('intro-done', true);
      //this.navCtrl.setRoot(IntroPage);
    }
  });
}
logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot('login');
  });
}
  
}