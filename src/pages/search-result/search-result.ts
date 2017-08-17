import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {HomePage} from '../../pages/home/home';
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


  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
      this.Category = navParams.get('Category'); 
     
      this.Product = navParams.get('Product');
this.searches=this.db.list('/byProduct/'+this.Category+'/'+this.Product);
  
this.Locations=this.db.list('/bycategory-prod-loc/'+this.Category+'/'+this.Product);
      
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
    console.log('ionViewDidLoad SearchResultPage');
   
  }
goHome(){
    this.navCtrl.setRoot(HomePage);
}
getAvgRating(orgn){
  
    var subtotal=0;
    var averagerating=0;
    var count=0;

   
this.db.object('/Orgn/'+orgn+'/',{preserveSnapshot:true})
.subscribe(snapshots=> {
    
       snapshots.forEach((snapshot)=>{

           var rateobj=snapshot.val();
           if (rateobj){
            var trxnvl=rateobj.rate*1;
                        subtotal += trxnvl;
                        count++; 
                    console.log('subtotal='+subtotal);
    }
       })
       
    if(count>0){
      averagerating=subtotal/count;
      
  }    ; 
 // console.log('returning'+averagerating);
  
   return averagerating;
    })  

this.trxnval=averagerating;}

getAllComments(orgn,i){
  this.viewindex=i;
   this.AllComments=this.db.list('/SupplierInfo',{
   query: {
orderByChild: 'Orgn',
equalTo: orgn
    }
   }); 
}
rate(orgn){
    
}
}
