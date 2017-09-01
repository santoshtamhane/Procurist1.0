import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    Loading,
    LoadingController,
    AlertController
} from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    AuthProvider
} from '../../providers/auth/auth';
@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    public signupForm: FormGroup;
    public loading: Loading;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public alertCtrl:AlertController,
        public formBuilder: FormBuilder, public authProvider: AuthProvider) {
        this.signupForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.compose([Validators.minLength(6),Validators.required])],
            myName:['',Validators.required],
            myOrg:['',Validators.required],
            myPhone:['',Validators.required],
            isAdmin:[0],
            myRole:['']
        });
    }
    /**
    * If the form is valid it will call the AuthProvider service to sign the
    * user up password displaying a loading component while the user waits.
    **
    If the form is invalid it will just log the form value,
    * feel free to handle that as you like.
    */
    
    signupUser(): void {
        if (!this.signupForm.valid) {
            // console.log(this.signupForm.value);
        } else {
            if(!this.signupForm.value.isAdmin){this.signupForm.value.isAdmin=0};
            this.authProvider.signupUser(this.signupForm.value.email,
    this.signupForm.value.password, this.signupForm.value.myName, this.signupForm.value.myPhone, this.signupForm.value.myOrg, this.signupForm.value.myRole, this.signupForm.value.isAdmin).then(() => {
                this.loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        message: 'Account for '+this.signupForm.value.email+ ' has been created with password: '+this.signupForm.value.password,
                        buttons: [{
                            text: "Ok",
                            role: 'cancel'
                        }]
                    });
                    alert.present();
                    this.navCtrl.pop();
                });
            }, (error) => {
                this.loading.dismiss().then(() => {
                    var errorMessage: string = error.message;
                    let alert = this.alertCtrl.create({
                        message: errorMessage,
                        buttons: [{
                            text: "Ok",
                            role: 'cancel'
                        }]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }
}