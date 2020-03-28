import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppComponent } from "./components/app.component";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { FirebaseUIModule } from "firebaseui-angular";

import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/moment";
import * as moment from "moment";

import { LoginComponent } from "./components/login/login.component";

export function momentAdapterFactory() {
    return adapterFactory(moment);
}
const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
            scopes: [
                "public_profile",
                "email",
                "user_likes",
                "user_friends"
            ],
            customParameters: {
                auth_type: "reauthenticate"
            },
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
        },
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
            requireDisplayName: false,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    tosUrl: "<your-tos-link>",
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
