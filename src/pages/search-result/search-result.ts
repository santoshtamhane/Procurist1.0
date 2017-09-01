import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {HomePage} from '../../pages/home/home';
import {RatePage} from '../../pages/rate/rate';
import {ContactDetailPage} from '../../pages/contact-detail/contact-detail';
/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
public Category:string;
public Product:string;
public searches:FirebaseListObservable<any[]>;
public searchescat:FirebaseListObservable<any[]>;
public Locations:FirebaseListObservable<any[]>;
public AllComments:FirebaseListObservable<any[]>;
public viewindex:any;
public trxnval:any;
public rating:any;
public contributorcount:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase,public modalCtrl:ModalController) {
      this.Category = navParams.get('Category'); 
     
      this.Product = navParams.get('Product');
this.searches=this.db.list('/byProduct/'+this.Category+'/'+this.Product);
  
//this.Locations=this.db.list('/bycategory-prod-loc/'+this.Category+'/'+this.Product);
   this.Locations=this.searches;   
  }
filterLocn(locn:string){
if((locn)&&(locn!='All')){
  this.searches=this.db.list('/bycategory-prod-loc/'+this.Category+'/'+this.Product+'/'+locn,{
   query: {
orderByChild: 'City',
equalTo: locn
    }
   });
}
else{
   this.searches=this.db.list('/byProduct/'+this.Category+'/'+this.Product);
};
}
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchResultPage');
   
  }
goHome(){
    this.navCtrl.setRoot(HomePage);
}
getAvgRating(orgn,choice){
  
    var subtotal=0;
    var averagerating=0;
    var count=0;

   
this.db.object('/Orgn/'+orgn,{preserveSnapshot:true})
.subscribe(snapshots=> {
    
       snapshots.forEach((snapshot)=>{

           var rateobj=snapshot.val();
           if (rateobj){
            var trxnvl=rateobj.rate*1;
            // console.log('trxnval='+trxnvl);
            if(trxnvl>0){
                        subtotal += trxnvl;
                        count++; 
           // console.log('subtotal='+subtotal);
           }
    }
       })
       
    if(count>0){
      averagerating=subtotal/count;
      
  }    ; 
 
   
    })  
this.contributorcount=count;
this.trxnval=averagerating;}

getAllComments(orgn,i){
  this.viewindex=i;
   this.AllComments=this.db.list('/Orgn/'+orgn); 
}
closeAllComments(){
  this.viewindex=-1;
   
}
rate(orgn,product,category){
     let obj = {Orgn: orgn, Product: product,Category:category};

   let myModal = this.modalCtrl.create(RatePage, obj);
    myModal.present();
}  
    showModal(org,phone,name){
         let myModal = this.modalCtrl.create(ContactDetailPage,{source:'SearchResult',SupplierName: name, Phone: phone,org:org});
    myModal.present();
        
    }

}
