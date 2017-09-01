import { Component} from '@angular/core';
import { NavController, NavParams,ViewController ,AlertController,ToastController,ModalController} from 'ionic-angular';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the RatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

public rateForm: FormGroup; // our form model
    Orgn: string = this.navParams.get('Orgn');
    Product: string = this.navParams.get('Product');
    Category:string=this.navParams.get('Category');
    public curruser:any;
    public trxndata:FirebaseListObservable<any[]>;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private _fbr:FormBuilder,private db: AngularFireDatabase,public authData:AuthProvider) {
          

  }
ngOnInit() {
    
    // we will initialize our form here
    this.rateForm = this._fbr.group({
            MainProduct:[],
            rate:[],
            Orgn:[this.Orgn],
            Supplier:[this.Orgn],
           Comments:['',Validators.compose([Validators.minLength(15), Validators.required])],
           SubmittedBy:[this.curruser],
           timestamp:['']
        });
  }
closeModal() {
    this.viewCtrl.dismiss();
        
  }
  saveRate(){
      var currentdate = new Date(); 
 var submitdate = new Date(currentdate.getFullYear(),
                    (currentdate.getMonth()+1),
                    currentdate.getDate(),
                 currentdate.getHours(), 
               currentdate.getMinutes(),
               currentdate.getSeconds()).getTime();
this.rateForm.get('timestamp').setValue(submitdate);
this.rateForm.get('SubmittedBy').setValue(this.curruser.email);


        this.trxndata=this.db.list('/Orgn/'+this.Orgn);
        this.trxndata.push(this.rateForm.value);
        this.closeModal();
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad RatePage');
         this.curruser=this.authData.getUser();
  }
starClicked(value){
  // // console.log("rating :", value);
   this.rateForm.get('rate').setValue(value);
}
}
