import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import {SearchResultPage} from '../../pages/search-result/search-result';
/**
 * Generated class for the SearchQueryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
name: 'SearchQuery'
})
@Component({
  selector: 'page-search-query',
  templateUrl: 'search-query.html',
})
export class SearchQueryPage {
public Categories:FirebaseListObservable<any[]>;
public Products:FirebaseListObservable<any[]>;
public searches:FirebaseListObservable<any[]>;

  public curruser:any;
  public SearchCriteria:any; // to set initial tab
  public viewindex:any;
  public shownGroup:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase,public authData:AuthProvider) {
      this.shownGroup = null;
      this.Categories=this.db.list('/Category/');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchQueryPage');
  }
    //searchquery=searchquery.replace(/\/\//g, '/');//replaces double forward slash to single
      
search(product,category){
    
    let params={
    Product: product, 
    Category: category
};
   this.navCtrl.push(SearchResultPage,params); 
}

toggleGroup(group,key) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
this.Products=this.db.list('/byProduct/'+key);
};
isGroupShown(group) {
    return this.shownGroup === group;
};
  
}
