import { Component ,OnInit } from '@angular/core';
import { NavController, NavParams,ViewController ,AlertController,ToastController} from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//import { Ionic2RatingModule } from 'ionic2-rating';
//import { TagsInputModule } from 'ionic2-tags-input';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import {EmailProvider}  from '../../providers/email/email';
//import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
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
    
    public curruser:any;
    public Categories:FirebaseListObservable<any[]>;
    public pageopensource:string;
    public Supplier:any;
    public Phone:any;
    public org:any;
public info:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private _fbr:FormBuilder,public alertCtrl:AlertController,private db: AngularFireDatabase,public toastCtrl:ToastController,public authData:AuthProvider) {
      this.Supplier = this.navParams.get('SupplierName');
    this.Phone= this.navParams.get('Phone');
    this.org=this.navParams.get('org');
    this.pageopensource=this.navParams.get('source');
      this.Categories=this.db.list('/Categories');
      this.curruser=this.authData.getUser();
      this.info="BasicInfo";

  }
  
  ngOnInit() {
    
    // we will initialize our form here
    this.myForm = this._fbr.group({
            City: ['',Validators.compose([Validators.maxLength(20), Validators.pattern('^[^.$#/]*$'), Validators.required])],
            Category1:['',Validators.required],
            Category2:[''],
            Category3:[''],
            MainProduct1:['',Validators.compose([Validators.maxLength(15), Validators.pattern('^[^.$#/]*$'), Validators.required])],
            MainProduct2:[''],
            MainProduct3:[''],
            rate:[],
            Orgn:['',Validators.compose([Validators.maxLength(25), Validators.pattern('^[^.$#/]*$'), Validators.required])],
          // Supplier:[this.SupplierName],
            //Phone:[this.Phone.replace(/\s/g, "") ],
            Supplier:[this.Supplier,Validators.compose([Validators.maxLength(25), Validators.pattern('^[^.$#/]*$'), Validators.required])],
            Phone:[this.Phone,Validators.compose([Validators.maxLength(10),Validators.required])],
            email:[],
            DisplayName:[],
            AltContact:[],
            AltPhone:[],
            AltEmail:[],
                Turnover:[],
             Speciality:[],
             MainProduct1Share:[],
             MainProduct2Share:[],
             MainProduct3Share:[],
            Comments:[''],
            website:['',Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$')],
           categorytag:[''],
           SubmittedBy:[this.curruser],
           timestamp:['']
        }), {validator: this.EmailProvider.isProduct2Reqd('Category2')};
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
/*save(){
    
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
      Orgn:this.myForm.get('Orgn').value,
      rate:this.myForm.get('rate').value,
      Comments:this.myForm.get('Comments').value,
      MainProduct1:this.myForm.get('MainProduct1').value,
      SubmittedBy:this.curruser.email,
      timestamp:submitdate
      
      } ;
      //trxndata=JSON.parse( JSON.stringify(trxndata ) );
      //console.log('trxndata='+ trxndata);

      
   this.bySubmitter=this.db.list('/bySubmitter/'+this.curruser.uid);   
   this.supplierinfo=this.db.list('/SupplierInfo/');
   this.supplierinfodetails=this.db.list('/Orgn/'+this.myForm.get('Orgn').value);
   this.byProduct=this.db.list('/Product/'+this.myForm.get('MainProduct1').value);
  
   this.supplierinfobyphone=this.db.list('/Phone/'+this.myForm.get('Phone').value); 
   this.supplierinfobycategory=this.db.list('Category/'+this.myForm.get('Category').value);
   this.supplierinfobycatloc=this.db.list('/bycategory-location/'+this.myForm.get('Category').value+'/'+this.myForm.get('City').value); 
   this.categorybyProduct=this.db.list('/byProduct/'+this.myForm.get('Category').value+'/'+this.myForm.get('MainProduct1').value);
   this.supplierinfobycatprodloc=this.db.list('/bycategory-prod-loc/'+this.myForm.get('Category').value+'/'+this.myForm.get('MainProduct1').value+'/'+this.myForm.get('City').value); 
   this.supplierinfobycatprodlocrate=this.db.list('/bycategory-prod-loc-rate/'+this.myForm.get('Category').value+'/'+this.myForm.get('MainProduct1').value+'/'+this.myForm.get('City').value+'/'+this.myForm.get('rate').value);
   


this.supplierinfo.push(this.myForm.value).then(()=> 
{ this.bySubmitter.push(this.myForm.value);

   this.supplierinfodetails.push(trxndata);
   this.byProduct.push(this.myForm.value);
   this.supplierinfobyphone.push(this.myForm.value);
  this.supplierinfobycategory.push(this.myForm.value);
  this.supplierinfobycatloc.push(this.myForm.value);
    this.categorybyProduct.push(this.myForm.value);
     this.supplierinfobycatprodloc.push(this.myForm.value);
     
        this.supplierinfobycatprodlocrate.push(this.myForm.value);
            
                let toast = this.toastCtrl.create({ message: 'Supplier Details submitted successfully', duration: 3000,position:'bottom' }); 
                toast.onDidDismiss(() => { this.navCtrl.pop(); })
                toast.present();
                });
}*/
save(){
    
 var currentdate = new Date(); 
 var submitdate = new Date(currentdate.getFullYear(),
                    (currentdate.getMonth()+1),
                    currentdate.getDate(),
                 currentdate.getHours(), 
               currentdate.getMinutes(),
               currentdate.getSeconds()).getTime();
this.myForm.get('timestamp').setValue(submitdate);
this.myForm.get('SubmittedBy').setValue(this.curruser.uid);
    
     
     //this.storage.set(this.SupplierName, true);
    

    var trxndata={
      Orgn:this.myForm.get('Orgn').value,
      rate:this.myForm.get('rate').value,
      Comments:this.myForm.get('Comments').value,
      SubmittedBy:this.curruser.email,
      timestamp:submitdate
      
      } ;
     var mainkey=this.db.list('/Company/').push({}).key;
    var updates = {};
  updates['/Company/' + mainkey] = this.myForm.value;
  updates['/bySubmitter/' + this.curruser.uid + '/' + mainkey] = this.myForm.value;
  updates['/Orgn/' + this.myForm.get('Orgn').value + '/' + mainkey] = trxndata;
  updates['/Category/' + this.myForm.get('Category1').value + '/' + mainkey] = this.myForm.value;
  updates['/byProduct/' + this.myForm.get('Category1').value + '/' + this.myForm.get('MainProduct1').value+'/'+mainkey] = this.myForm.value;
  updates['/bycategory-prod-loc/'+ this.myForm.get('Category1').value + '/' + this.myForm.get('MainProduct1').value+'/'+this.myForm.get('City').value+'/'+mainkey] = this.myForm.value;
  if (this.myForm.get('Category2') ){
  updates['/Category/' + this.myForm.get('Category2').value + '/' + mainkey] = this.myForm.value;
  updates['/byProduct/' + this.myForm.get('Category2').value + '/' + this.myForm.get('MainProduct2').value+'/'+mainkey] = this.myForm.value;
  updates['/bycategory-prod-loc/'+ this.myForm.get('Category2').value + '/' + this.myForm.get('MainProduct2').value+'/'+this.myForm.get('City').value+'/'+mainkey] = this.myForm.value;
  };
  if (this.myForm.get('Category3') ){
  updates['/Category/' + this.myForm.get('Category3').value + '/' + mainkey] = this.myForm.value;
    updates['/byProduct/' + this.myForm.get('Category3').value + '/' + this.myForm.get('MainProduct3').value+'/'+mainkey] = this.myForm.value;
    updates['/bycategory-prod-loc/'+ this.myForm.get('Category3').value + '/' + this.myForm.get('MainProduct3').value+'/'+this.myForm.get('City').value+'/'+mainkey] = this.myForm.value;
    };
  firebase.database().ref().update(updates).then(()=>{
                let toast = this.toastCtrl.create({ message: 'Supplier Details submitted successfully', duration: 3000,position:'bottom' }); 
                toast.onDidDismiss(() => { 
                if(this.pageopensource=="HomePage"){
                    this.navCtrl.push(ContactDetailPage,{source:'HomePage'});}
                else{
                    this.navCtrl.pop(); 
                }
                
                })
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
