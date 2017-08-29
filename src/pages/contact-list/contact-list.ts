import { Component} from '@angular/core';
import { NavController,Platform,ToastController,ModalController,LoadingController ,AlertController,IonicPage} from 'ionic-angular';
//import * as _ from 'lodash'; 
import { Storage } from '@ionic/storage';
// import {UniquePipe} from '../../pipes/unique/unique'


import { Contacts } from 'ionic-native';

import {ContactDetailPage} from '../../pages/contact-detail/contact-detail';
/**
 * Generated class for the ContactListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
name: 'ContactList'
})
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage  {
  contactlist: any;
  Loadedcontactlist:any;
  shouldAnimate: boolean = true;
 groupedContacts = [];
  cont=[];
 isSubmitstatus:any;
 public showcontactlist:boolean;
  constructor(public navCtrl: NavController,public platform: Platform,public toastCtrl: ToastController,public modalCtrl: ModalController,public loadingCtrl: LoadingController,public storage:Storage,public alertCtrl:AlertController) {
           this.showcontactlist=false;
           this.groupContacts('');
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Please wait while we retrieve your contact list...",
      duration: 4000
      
    });
    loader.present();
  }
share(contact){
    var name;
    var phone;
    
    Contacts.find(['displayName','name'], {filter: contact, multiple: false})
    .then(contactnames => {
        
        contactnames.forEach((contname)=>{
         name=contname.displayName;
    phone=contname.phoneNumbers[0].value;
   
      });
        
         let obj = {SupplierName: name, Phone: phone};

  /* let myModal = this.modalCtrl.create(ContactDetailPage, obj);
    myModal.present();*/
   
    this.navCtrl.push(ContactDetailPage, {source:'ContactList',SupplierName: name, Phone: phone});
  });
}
update(contact){
}

del(contact){
     this.storage.remove(contact);
}
filterContacts(searchTerm:any){
  var q = searchTerm.target.value;
  if (q.length<3) {
    return;
  }
this.groupContacts(q);  
}
groupContacts(contactperson){
    Contacts.find(['displayName', 'name'], {filter: contactperson, multiple: true})
    .then(conts => {
     this.contactlist=conts; //for search
     this.Loadedcontactlist=conts; 
      conts.forEach((contname)=>{
          this.cont.push(contname.displayName);
      });
    
        let sortedContacts = this.cont.sort();
        
        let currentLetter = false;
        let currentContacts = [];
 
        sortedContacts.forEach((value, index) => {
            if(value.charAt(0) != currentLetter){
 
                currentLetter = value.charAt(0);

                let newGroup = {
                    letter: currentLetter,
                    contacts: []
                };

                currentContacts = newGroup.contacts;
                this.groupedContacts.push(newGroup);
 
            } 
 
            currentContacts.push(value);

        });

    });
    
   
    };
 
   /* groupContacts(){
        var contnm;
       Contacts.find(['displayName', 'name', 'phoneNumbers', 'emails','organizations'], {filter: "", multiple: false})
    .then(contactnames => { 
        let sortedContacts=contactnames.sort(function(x,y) { return ((x.displayName== y.displayName) ?0 : ((x.displayName.toLowerCase()> y.displayName.toLowerCase()) ? 1 : -1 )); }) ;      
        let currentLetter = false;
        let currentContacts = [];
        sortedContacts.forEach((value, index) => {
contnm=value.displayName;
            if(contnm.charAt(0) != currentLetter){
 
                currentLetter = contnm.charAt(0);

                let newGroup = {
                    letter: currentLetter,
                    contacts: []
                };

                currentContacts = newGroup.contacts;
                this.groupedContacts.push(newGroup);
 
            } 
 
            currentContacts.push(value);

        });
});
    }*/
    
    initializeItems(){
  this.contactlist = this.Loadedcontactlist;
  
}

getcontactlist(searchTerm:any) {
  // Reset items back to all of the items

  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchTerm.target.value;


  // if the value is an empty string or less than 3 char don't filter the items
  if ((!q)||(q.length<3)) {
      this.showcontactlist=false;
    return;
  } 
  this.showcontactlist=true;
this.contactlist=this.contactlist.filter((v)=>{
   
        if(v.displayName && q) {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
     }
      return false;   
   });
//this.groupedContacts=this.recreategroupContacts(list);
}
    presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Already Added',
    subTitle: 'You have already added this contact!',
    buttons: ['Dismiss']
  });
  alert.present();
}

    debugAlert(title,msg) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: msg,
    buttons: ['Dismiss']
  });
  alert.present();
}
    
}
