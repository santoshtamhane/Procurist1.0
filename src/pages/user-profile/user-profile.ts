import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomePage} from '../../pages/home/home';
/**
 * Generated class for the UserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage implements OnInit{
    public signupForm:FormGroup;
public curruser:any;
public uid:any;
   public UserProfile:any;
     public Contributions:FirebaseListObservable<any[]>;
     public email:string;
     public myName:string;
     public myPhone:string;
     public myOrg:string;
      public myRole:string;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,public toastCtrl:ToastController,public authData:AuthProvider,public formBuilder: FormBuilder,) {
       this.curruser=this.authData.getUser();
       this.uid=this.curruser.uid;
       this.Contributions=this.db.list('/bySubmitter/'+this.uid);
       this.db.object('/userProfile/'+this.uid,{preserveSnapshot:true})
       .subscribe(snapshot=> {
     this.email=snapshot.val().email;
    this.myName=snapshot.val().username;
    this.myPhone=snapshot.val().userphone;
    this.myOrg=snapshot.val().userorg;
  // this.myRole=snapshot.val().myRole;
    });  
    this.signupForm = this.formBuilder.group({
        email: [this.email, Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        myName:[this.myName,Validators.required],
        myPhone:[this.myPhone,Validators.required],
        myOrg:[this.myOrg,Validators.required],
        myRole:[this.myRole]
      });     
  }
ngOnInit(){
                            
                      

     
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    
  }
updateUser(){
    
}
goHome(){
    this.navCtrl.setRoot(HomePage);
}

}
