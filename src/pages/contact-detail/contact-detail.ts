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
    public Products1:FirebaseListObservable<any[]>;
    public Products2:FirebaseListObservable<any[]>;
    public Products3:FirebaseListObservable<any[]>;
    public pageopensource:string;
    public Orgn:string;
    public org:any;
    public info:any;
public City:string;
public Category1:string;
public Category2:string;
public Category3:string;
public MainProduct1:string;
public MainProduct2:string;
public MainProduct3:string;
public MainProduct1Share:string;
public MainProduct2Share:string;
public MainProduct3Share:string;
public rate:0;
public Supplier:any;
public Phone:any;
 public email:string;
           public DisplayName:string;
           public AltContact:string;
           public AltPhone:string;
           public AltEmail:string;
           public     Turnover:any;
           public  Speciality:string;
           public Comments:string;
          public  website:string;
          public categorytag:string;
          public SubmittedBy:string;
          public timestamp:any;
          public ismodaldisplay:boolean;
public showsave:boolean;
public mk:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private _fbr:FormBuilder,public alertCtrl:AlertController,private db: AngularFireDatabase,public toastCtrl:ToastController,public authData:AuthProvider) {
      this.Supplier = this.navParams.get('SupplierName');
    this.Phone= this.navParams.get('Phone') ;
    this.Phone?this.Phone.replace(/\s/g,""):this.Phone;
    this.org=this.navParams.get('org');
    this.pageopensource=this.navParams.get('source');
      this.Categories=this.db.list('/Categories');
      this.curruser=this.authData.getUser();
      this.info="BasicInfo"; //default tab
      this.ismodaldisplay=this.pageopensource=='SearchResult'?true:false;
      
      
    this.db.object('/byContactPhone/'+this.Phone,{preserveSnapshot:true})
       .subscribe(snapshots=> {        
    if(snapshots.val()){
      snapshots.forEach((snapshot)=>{
          this.showsave=true;
          this.mk=snapshot.key;
     this.City=snapshot.val().City;
    this.Category1=snapshot.val().Category1;
    this.Category2=snapshot.val().Category2;
    this.Category3=snapshot.val().Category3;
    this.MainProduct1=snapshot.val().MainProduct1;
    this.MainProduct2=snapshot.val().MainProduct2;
    this.MainProduct3=snapshot.val().MainProduct3;
    this.MainProduct1Share=snapshot.val().MainProduct1Share;
    this.MainProduct1Share=snapshot.val().MainProduct2Share;
    this.MainProduct1Share=snapshot.val().MainProduct3Share;
    this.Orgn=snapshot.val().Orgn;
    this.email=snapshot.val().email;
    this.AltContact=snapshot.val().AltContact;
    this.AltPhone=snapshot.val().AltPhone;
    this.AltEmail=snapshot.val().AltEmail;
    this.website=snapshot.val().website;
    this.Comments=snapshot.val().Comments;
    this.Products1=this.db.list('/Categories/'+snapshot.val().Category1);
    this.Products2=this.db.list('/Categories/'+snapshot.val().Category2);
    this.Products3=this.db.list('/Categories/'+snapshot.val().Category3);
      })  
      }
      else{
          this.showsave=false;
      }
    });  
  }
  ngOnInit() {
    
    // we will initialize our form here
    this.myForm = this._fbr.group({
                  City: [{value:this.City,disabled:this.ismodaldisplay?true:false},Validators.compose([Validators.maxLength(20), Validators.pattern('^[^.$#&/]*$'), Validators.required])],
            Category1:[{value:this.Category1,disabled:this.ismodaldisplay?true:false},Validators.required],
            Category2:[{value:this.Category2,disabled:this.ismodaldisplay?true:false}],
            Category3:[{value:this.Category3,disabled:this.ismodaldisplay?true:false}],
            MainProduct1:[{value:this.MainProduct1,disabled:this.ismodaldisplay?true:false},Validators.required],
            MainProduct2:[{value:this.MainProduct2,disabled:this.ismodaldisplay?true:false}],
            MainProduct3:[{value:this.MainProduct3,disabled:this.ismodaldisplay?true:false}],
            rate:[{value:this.rate,disabled:this.ismodaldisplay?true:false}],
            Orgn:[{value:this.Orgn,disabled:this.ismodaldisplay?true:false},Validators.compose([Validators.maxLength(40), Validators.pattern('^[^.$#&/]*$'), Validators.required])],
          // Supplier:[this.SupplierName],
            //Phone:[this.Phone.replace(/\s/g, "") ],
            Supplier:[{value:this.Supplier,disabled:this.ismodaldisplay?true:false},Validators.compose([Validators.maxLength(30), Validators.pattern('^[^.$#&/]*$'), Validators.required])],
            Phone:[{value:this.Phone,disabled:this.ismodaldisplay?true:false} ,Validators.compose([Validators.maxLength(10),Validators.required])],
            email:[{value:this.email,disabled:this.ismodaldisplay?true:false}],
            DisplayName:[{value:this.Supplier,disabled:this.ismodaldisplay?true:false}],
            AltContact:[{value:this.AltContact,disabled:this.ismodaldisplay?true:false},Validators.pattern('^[^.$#&/]*$')],
            AltPhone:[{value:this.AltPhone,disabled:this.ismodaldisplay?true:false}],
            AltEmail:[{value:this.AltEmail,disabled:this.ismodaldisplay?true:false}],
            Turnover:[{value:this.Turnover,disabled:this.ismodaldisplay?true:false}],
           
    MainProduct1Share:[{value:this.MainProduct1Share,disabled:this.ismodaldisplay?true:false},Validators.pattern('^([1-9]?[0-9]?)$|100')],
             MainProduct2Share:[{value:this.MainProduct2Share,disabled:this.ismodaldisplay?true:false},Validators.pattern('^([1-9]?[0-9]?)$')],
             MainProduct3Share:[{value:this.MainProduct3Share,disabled:this.ismodaldisplay?true:false},Validators.pattern('^([1-9]?[0-9]?)$')],
            Comments:[{value:this.Comments,disabled:this.ismodaldisplay?true:false}],
            website:[{value:this.website,disabled:this.ismodaldisplay?true:false},Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$')],
           categorytag:[''],
           SubmittedBy:[this.curruser],
           timestamp:['']
        });
        this.myForm.get('Category2').valueChanges.subscribe((Category2) => {
if(Category2){
this.myForm.get('MainProduct2').setValidators([Validators.required]);
}
this.myForm.get('MainProduct2').updateValueAndValidity();
 });
this.myForm.get('Category3').valueChanges.subscribe((Category3) => {
if(Category3){
this.myForm.get('MainProduct3').setValidators([Validators.required]);
}
this.myForm.get('MainProduct3').updateValueAndValidity();

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
  setProduct(prodkey:string,itemnum:number){
      switch(itemnum) {
    case 1:
        this.Products1=this.db.list('/Categories/'+prodkey);
        break;
    case 2:
           this.Products2=this.db.list('/Categories/'+prodkey);
        break;
    case 3:
           this.Products3=this.db.list('/Categories/'+prodkey);
        break;
    
}
      
      console.log('prodkey='+prodkey);
  }
  
submit(){
    
 var currentdate = new Date(); 
 var submitdate = new Date(currentdate.getFullYear(),
                    (currentdate.getMonth()+1),
                    currentdate.getDate(),
                 currentdate.getHours(), 
               currentdate.getMinutes(),
               currentdate.getSeconds()).getTime();
this.myForm.get('timestamp').setValue(submitdate);
this.myForm.get('SubmittedBy').setValue(this.curruser.uid);
this.myForm.get('Comments').setValue(this.myForm.get('Comments').value?this.myForm.value.Comments:null);
this.myForm.get('email').setValue(this.myForm.get('email').value?this.myForm.value.email:null);
this.myForm.get('website').setValue(this.myForm.get('website').value?this.myForm.value.website:null);
this.myForm.get('AltEmail').setValue(this.myForm.get('AltEmail').value?this.myForm.value.AltEmail:null);
this.myForm.get('AltContact').setValue(this.myForm.get('AltContact').value?this.myForm.value.AltContact:null);
this.myForm.get('AltPhone').setValue(this.myForm.get('AltPhone').value?this.myForm.value.AltPhone:null);
this.myForm.get('MainProduct1Share').setValue(this.myForm.get('MainProduct1Share').value?this.myForm.value.MainProduct1Share:null);
this.myForm.get('MainProduct2Share').setValue(this.myForm.get('MainProduct2Share').value?this.myForm.value.MainProduct2Share:null);
this.myForm.get('MainProduct3Share').setValue(this.myForm.get('MainProduct3Share').value?this.myForm.value.MainProduct3Share:null);
this.myForm.get('Turnover').setValue(this.myForm.get('Turnover').value?this.myForm.value.Turnover:null);
this.myForm.get('rate').setValue(this.myForm.get('rate').value?this.myForm.value.rate:null);
this.myForm.get('Category2').setValue(this.myForm.get('Category2').value?this.myForm.value.Category2:null);
this.myForm.get('Category3').setValue(this.myForm.get('Category3').value?this.myForm.value.Category3:null);
this.myForm.get('MainProduct2').setValue(this.myForm.get('MainProduct2').value?this.myForm.value.MainProduct2:null);
this.myForm.get('MainProduct3').setValue(this.myForm.get('MainProduct3').value?this.myForm.value.MainProduct3:null);
     //this.storage.set(this.SupplierName, true);
    

    var trxndata={
      Orgn:this.myForm.get('Orgn').value,
      rate:this.myForm.get('rate').value,
      Comments:this.myForm.get('Comments').value,
      SubmittedBy:this.curruser.email,
      timestamp:submitdate
      } ;
      if(!this.mk){
      var mainkey=this.db.list('/Company/').push({}).key;}
      else {mainkey=this.mk;}
      console.log('mainkey='+mainkey);
      console.log(this.myForm.value);
    var updates = {};
  updates['/Company/' + mainkey] = this.myForm.value;
  updates['/bySubmitter/' + this.curruser.uid + '/' + mainkey] = this.myForm.value;
  updates['/Orgn/' + this.myForm.get('Orgn').value + '/' + mainkey] = trxndata;
  updates['/Category/' + this.myForm.get('Category1').value + '/' + mainkey] = this.myForm.value;
  updates['/byProduct/' + this.myForm.get('Category1').value + '/' + this.myForm.get('MainProduct1').value+'/'+mainkey] = this.myForm.value;
  updates['/bycategory-prod-loc/'+ this.myForm.get('Category1').value + '/' + this.myForm.get('MainProduct1').value+'/'+this.myForm.get('City').value+'/'+mainkey] = this.myForm.value;
  updates['/byContactPhone/' + this.myForm.get('Phone').value + '/' + mainkey] = this.myForm.value;
  if (this.myForm.get('Category2').value!=null ){
      console.log('if value='+this.myForm.get('Category2').value);
  updates['/Category/' + this.myForm.get('Category2').value + '/' + mainkey] = this.myForm.value;
  updates['/byProduct/' + this.myForm.get('Category2').value + '/' + this.myForm.get('MainProduct2').value+'/'+mainkey] = this.myForm.value;
  updates['/bycategory-prod-loc/'+ this.myForm.get('Category2').value + '/' + this.myForm.get('MainProduct2').value+'/'+this.myForm.get('City').value+'/'+mainkey] = this.myForm.value;
  };
  if (this.myForm.get('Category3').value!=null ){
  updates['/Category/' + this.myForm.get('Category3').value + '/' + mainkey] = this.myForm.value;
    updates['/byProduct/' + this.myForm.get('Category3').value + '/' + this.myForm.get('MainProduct3').value+'/'+mainkey] = this.myForm.value;
    updates['/bycategory-prod-loc/'+ this.myForm.get('Category3').value + '/' + this.myForm.get('MainProduct3').value+'/'+this.myForm.get('City').value+'/'+mainkey] = this.myForm.value;
    };
    
  firebase.database().ref().update(updates).then(()=>{
                let toast = this.toastCtrl.create({ message: 'Supplier Details submitted successfully', duration: 3000,position:'bottom' }); 
                toast.onDidDismiss(() => { 
                                 this.navCtrl.pop(); 
                
                
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
