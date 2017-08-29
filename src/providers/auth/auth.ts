import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth,public afDatabase: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
   this.user = afAuth.authState;
  }
getUser():firebase.User {
//return this.afAuth.auth.currentUser;
return firebase.auth().currentUser;
}
loginUser(newEmail: string, newPassword: string):firebase.Promise<any> {
return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
}
anonymousLogin():firebase.Promise<any> {
return this.afAuth.auth.signInAnonymously();
}
linkAccount(email: string, password: string):firebase.Promise<any> {
const credential = firebase.auth.EmailAuthProvider
.credential(email, password);
return this.afAuth.auth.currentUser.linkWithCredential(credential)
.then( user => {
this.afDatabase.object('/userProfile/${user.uid}/').update({
email: email
});
}, error => {
console.log("There was an error linking the account", error);
});
}
resetPassword(email: string):firebase.Promise<any> {
return this.afAuth.auth.sendPasswordResetEmail(email);
}

logoutUser():firebase.Promise<void> { return this.afAuth.auth.signOut(); }

updateUserProfile(email: string, password: string,name:string,phone:string,org:string,role:string):firebase.Promise<any> {
   const credential = firebase.auth.EmailAuthProvider
.credential(email, password);
if(credential){
return this.afAuth.auth.currentUser.reauthenticateWithCredential(credential)
.then( user => {
this.afDatabase.object('/userProfile/'+this.afAuth.auth.currentUser.uid).update({
email: email,
username:name,
       userphone:phone,
       userorg:org,
        myRole:role
});
}, error => {
console.log("There was an error updating the account", error);
});
}
}
}
