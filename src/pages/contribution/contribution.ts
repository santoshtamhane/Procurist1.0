import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,ActionSheetController,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import {HomePage} from '../../pages/home/home';
import {ContactDetailPage} from '../../pages/contact-detail/contact-detail';
import {ContactListPage} from '../../pages/contact-list/contact-list';
/**
 * Generated class for the ContributionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({ 
  selector: 'page-contribution',
  templateUrl: 'contribution.html',
})
export class ContributionPage {
public curruser:any;
public uid:any;
   public UserProfile:any;
     public Contributions:FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,public toastCtrl:ToastController,public authData:AuthProvider, public actionsheetCtrl: ActionSheetController,public alertCtrl: AlertController) {
      this.curruser=this.authData.getUser();
       this.uid=this.curruser.uid;
       this.Contributions=this.db.list('/bySubmitter/'+this.uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionPage');
  }
goHome(){
    this.navCtrl.setRoot(HomePage);
}
openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Contribute',
      cssClass: 'page-contribution',
      buttons: [
              {
          text: 'Add supplier from your Contact Book',
          icon: 'share',
          handler: () => {
            this.navCtrl.push(ContactListPage);
          }
        },
        {
          text: 'Add supplier manually',
          icon: 'share-alt',
          handler: () => {
           this.navCtrl.push(ContactDetailPage,{source:'HomePage'});
          }
        },
        {
          text: 'Add category & product',
          icon: 'construct',
          handler: () => {
            this.showPrompt();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Create Category',
      message: "Enter the new category name and item name that you wish to create",
      inputs: [
        {
          name: 'Category',
          placeholder: 'Category'
        },
        {
          name: 'Item',
          placeholder: 'Item'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
              var cat = data.Category.replace(/\//g, '_');
              cat = cat.replace(/\./g, '_');
              cat=cat.replace(/\s\s+/g, ' ');
              var prod=data.Item.replace(/\//g, '_');
              prod = prod.replace(/\./g, '_');
              prod=prod.replace(/\s\s+/g, ' ');
              var currentdate = new Date(); 
 var submitdate = new Date(currentdate.getFullYear(),
                    (currentdate.getMonth()+1),
                    currentdate.getDate(),
                 currentdate.getHours(), 
               currentdate.getMinutes(),
               currentdate.getSeconds()).getTime();
this.db.list('/Categories/'+cat).push({Product:prod,SubmittedBy:this.uid,SubmittedOn:submitdate});
          }
        }
      ]
    });
    prompt.present();
  }
  loadSupplierInfo(name:string,phone:string,org:string){
       this.navCtrl.push(ContactDetailPage, {source:'ContactList',SupplierName: name, Phone: phone,org:org});
  }
 /* pushdata(){
      this.db.list('/Categories/HVAC').push({'Product':'AC Compressor'});
this.db.list('/Categories/HVAC').push({'Product':'Fan'});
this.db.list('/Categories/HVAC').push({'Product':'Cooling Unit'});
this.db.list('/Categories/BIW').push({'Product':'Skin Panels'});
this.db.list('/Categories/BIW').push({'Product':'Inside stamp assys'});
this.db.list('/Categories/Powertrain').push({'Product':'Transmission'});
this.db.list('/Categories/Powertrain').push({'Product':'Engines'});
this.db.list('/Categories/Powertrain').push({'Product':'Cylinder Block'});
this.db.list('/Categories/Powertrain').push({'Product':'Cylinder Head'});
this.db.list('/Categories/Powertrain').push({'Product':'Camshafts'});
this.db.list('/Categories/Powertrain').push({'Product':'Crankshafts'});
this.db.list('/Categories/Powertrain').push({'Product':'Connecting Rods'});
this.db.list('/Categories/Powertrain').push({'Product':'Gears'});
this.db.list('/Categories/Powertrain').push({'Product':'Clutch'});
this.db.list('/Categories/Powertrain').push({'Product':'Turbo'});
this.db.list('/Categories/Powertrain').push({'Product':'Water pumps'});
this.db.list('/Categories/Powertrain').push({'Product':'Oil pumps'});
this.db.list('/Categories/Chassis').push({'Product':'Chassis'});
this.db.list('/Categories/Chassis').push({'Product':'Brakes'});
this.db.list('/Categories/Chassis').push({'Product':'Drive shafts'});
this.db.list('/Categories/Chassis').push({'Product':'Suspensions'});
this.db.list('/Categories/Chassis').push({'Product':'Steering'});
this.db.list('/Categories/Doors_Closures').push({'Product':'Window regulators'});
this.db.list('/Categories/Doors_Closures').push({'Product':'Glasses'});
this.db.list('/Categories/Doors_Closures').push({'Product':'Tires'});
this.db.list('/Categories/Services').push({'Product':'QC Services'});
this.db.list('/Categories/Services').push({'Product':'SCM services'});
this.db.list('/Categories/Services').push({'Product':'Packaging'});
this.db.list('/Categories/Services').push({'Product':'QC Services'});
this.db.list('/Categories/Services').push({'Product':'Logistics'});
this.db.list('/Categories/Services').push({'Product':'Custom Agents'});
this.db.list('/Categories/Services').push({'Product':'Training'});
this.db.list('/Categories/Non Auto').push({'Product':'Heavy Engineering'});
this.db.list('/Categories/Non Auto').push({'Product':'Bulk Consummables'});
this.db.list('/Categories/Non Auto').push({'Product':'Heavy Engineering'});
this.db.list('/Categories/Non Auto').push({'Product':'Tools,Jigs,Fixtures'});
this.db.list('/Categories/Non Auto').push({'Product':'Furnace Manufacturer'});
this.db.list('/Categories/Non Auto').push({'Product':'Coal Bulk Supplier'});
this.db.list('/Categories/Non Auto').push({'Product':'Heavy Engineering'});
this.db.list('/Categories/Non Auto').push({'Product':'Propane Fuel Supplier'});
this.db.list('/Categories/Non Auto').push({'Product':'Medical Equipment Supplier'});
this.db.list('/Categories/Non Auto').push({'Product':'Conveyors Automation'});
this.db.list('/Categories/Non Auto').push({'Product':'Industrial Automation'});
this.db.list('/Categories/Non Auto').push({'Product':'Conductors and Insulation'});
this.db.list('/Categories/Non Auto').push({'Product':'Piping bulk items, static equipment'});
  }*/
}
