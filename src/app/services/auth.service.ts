import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore,
        private router: Router,
    ) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    async googleSignIn() {
        const provider = new auth.GoogleAuthProvider();
        const credentials = await this.afAuth.auth.signInWithPopup(provider);
        console.log({ test: credentials.user });
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        this.router.navigate(["/"]);
    }
}
