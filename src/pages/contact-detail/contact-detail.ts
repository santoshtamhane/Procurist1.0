import { Component ,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController ,AlertController,ToastController} from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//import { Ionic2RatingModule } from 'ionic2-rating';
//import { TagsInputModule } from 'ionic2-tags-input';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
//import * as firebase from 'firebase';
/**
 * Generated class for the ContactDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html',
})
export class ContactDetailPage implements OnInit {
    public myForm: FormGroup; // our form model
    SupplierName: string = this.navParams.get('SupplierName');
    Phone: string = this.navParams.get('Phone');
    org:string=this.navParams.get('org');
    public curruser:any;
    public Categories:FirebaseListObservable<any[]>;
    public supplierinfo:FirebaseListObservable<any[]>;
    public byProduct:FirebaseListObservable<any[]>;
    public supplierinfodetails:FirebaseListObservable<any[]>;
    public supplierinfobycategory:FirebaseListObservable<any[]>;
    public supplierinfobyphone:FirebaseListObservable<any[]>;
       public supplierinfobycatloc:FirebaseListObservable<any[]>;
      public categorybyProduct:FirebaseListObservable<any[]>;
       public supplierinfobyname:FirebaseListObservable<any[]>;
             public bySubmitter:FirebaseListObservable<any[]>;
    public supplierinfobycatprodloc:FirebaseListObservable<any[]>;
    public supplierinfobycatprodlocrate:FirebaseListObservable<any[]>;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private _fbr:FormBuilder,public alertCtrl:AlertController,private db: AngularFireDatabase,public toastCtrl:ToastController,public authData:AuthProvider,public storage:Storage) {
      
      this.Categories=this.db.list('/Categories');
      this.curruser=this.authData.getUser();
  }
  
  ngOnInit() {
    
    // we will initialize our form here
    this.myForm = this._fbr.group({
            City: ['', [Validators.required, Validators.minLength(3)]],
            Category:['',Validators.required],
            MainProduct:['',Validators.required],
            rate:[],
            Orgn:['',Validators.required],
            Supplier:[this.SupplierName],
            Phone:[this.Phone.replace(/\s/g, "") ],
            Comments:[''],
           categorytag:[''],
           SubmittedBy:[this.curruser],
           timestamp:['']
        });
  }
closeModal() {
    //this.viewCtrl.dismiss();
        this.navCtrl.pop();
  }

starClicked(value){
  // console.log("rating :", value);
   this.myForm.get('rate').setValue(value);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
    //this.debugAlert('contact-detail','page');
  }
save(){
    
 var currentdate = new Date(); 
 var submitdate = new Date(currentdate.getFullYear(),
                    (currentdate.getMonth()+1),
                    currentdate.getDate(),
                 currentdate.getHours(), 
               currentdate.getMinutes(),
               currentdate.getSeconds()).getTime();
this.myForm.get('timestamp').setValue(submitdate);
this.myForm.get('SubmittedBy').setValue(this.curruser.email);
    
     
     //this.storage.set(this.SupplierName, true);
    

    var trxndata={
      [this.myForm.get('Orgn').value]:{
      Rating:this.myForm.get('rate').value,
      Comments:this.myForm.get('Comments').value,
      Organization:this.myForm.get('MainProduct').value
      }
      } ;
      //trxndata=JSON.parse( JSON.stringify(trxndata ) );
      //console.log('trxndata='+ trxndata);
var catproddata={
  "Category":  this.myForm.get('Category').value,
  "Products":[
  ]
};
      
   this.bySubmitter=this.db.list('/bySubmitter/'+this.curruser.uid);   
   this.supplierinfo=this.db.list('/SupplierInfo/');
   this.supplierinfodetails=this.db.list('/Orgn/'+this.myForm.get('Orgn').value);
   this.byProduct=this.db.list('/Product/'+this.myForm.get('MainProduct').value);
   this.supplierinfobyphone=this.db.list('/Phone/'+this.myForm.get('Phone').value); 
   this.supplierinfobycategory=this.db.list('Category/'+this.myForm.get('Category').value);
   this.supplierinfobycatloc=this.db.list('/bycategory-location/'+this.myForm.get('Category').value+'/'+this.myForm.get('City').value); 
   this.categorybyProduct=this.db.list('/byProduct/'+this.myForm.get('Category').value+'/'+this.myForm.get('MainProduct').value);
   this.supplierinfobycatprodloc=this.db.list('/bycategory-prod-loc/'+this.myForm.get('Category').value+'/'+this.myForm.get('MainProduct').value+'/'+this.myForm.get('City').value); 
   this.supplierinfobycatprodlocrate=this.db.list('/bycategory-prod-loc-rate/'+this.myForm.get('Category').value+'/'+this.myForm.get('MainProduct').value+'/'+this.myForm.get('City').value+'/'+this.myForm.get('rate').value);
   


this.supplierinfo.push(this.myForm.value).then(()=> 
{ this.bySubmitter.push(this.myForm.value);
   this.supplierinfodetails.push(this.myForm.value);
   this.byProduct.push(this.myForm.value);
   this.supplierinfobyphone.push(this.myForm.value);
  this.supplierinfobycategory.push(this.myForm.value);
  this.supplierinfobycatloc.push(this.myForm.value);
    this.categorybyProduct.push(this.myForm.value);
     this.supplierinfobycatprodloc.push(this.myForm.value);
     
        this.supplierinfobycatprodlocrate.push(this.myForm.value);
            
                let toast = this.toastCtrl.create({ message: 'Supplier Details submitted successfully', duration: 2000,position:'bottom' }); 
                toast.onDidDismiss(() => { this.navCtrl.pop(); })
                toast.present();
                });
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
