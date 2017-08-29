import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {ContactListPage} from '../../pages/contact-list/contact-list';
import {ContactDetailPage} from '../../pages/contact-detail/contact-detail';
import {SearchQueryPage} from '../../pages/search-query/search-query';
import { ContributionPage } from '../../pages/contribution/contribution';
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
  
  constructor(public navCtrl: NavController,public storage:Storage,public authData:AuthProvider,public alertCtrl:AlertController) {

      
  }
    launchContribution(){ 
   
    this.navCtrl.push(ContributionPage);
      
    }
     launchSearch(){
      this.navCtrl.push(SearchQueryPage);
      
    }
    launchDiscussion(){
      
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
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose');

    alert.addInput({
      type: 'radio',
      label: 'Add supplier from phonebook',
      value: '1',
      
    });
    alert.addInput({
      type: 'radio',
      label: 'Add supplier manually',
      value: '0',
      
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
       if(data=='1'){
           this.navCtrl.push(ContactListPage);
       } 
       else{
           this.navCtrl.push(ContactDetailPage,{source:'HomePage'});
       }
      }
    });
    alert.present();
  }
}