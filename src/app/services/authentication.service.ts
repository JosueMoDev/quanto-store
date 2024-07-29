import {  inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from '@angular/fire/auth';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

type login = { email: string; password: string };
type register = { email: string; password: string, displayName: string };
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async login(form: login): Promise<any> {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      form.email,
      form.password
    );
    sessionStorage.setItem(
      'currentUserLogged',
      JSON.stringify({
        email: user.email,
        id: user.uid,
        token: user.refreshToken,
      })
    );
  }

  async createNewAccount(form: register) {
    const { email, password, displayName } = form;
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    await setDoc(doc(this.firestore, `users/${user.uid}`), {
      uid: user.uid,
      email: user.email,
      displayName: form.displayName,
    });
    if (user.refreshToken) {
       sessionStorage.setItem(
         'currentUserLogged',
         JSON.stringify({
           email: user.email,
           id: user.uid,
           token: user.refreshToken,
         })
       );
    };
  }

  logout() {
    sessionStorage.removeItem('currentUserLogged');
    return from(signOut(this.auth));
  }
}
