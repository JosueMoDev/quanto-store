import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from '@angular/fire/auth';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {  from } from 'rxjs';
import {User} from '@models/user.model'
type login = { email: string; password: string, displayName?: string};
type register = { email: string; password: string, displayName: string };

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  #auth = inject(Auth);
  #firestore = inject(Firestore);
  #router = inject(Router);

  #currentUserLogged = signal<User | null>(this.#getUserFromSessionStorage());
  

  async login(form: login): Promise<void> {
    const { user } = await signInWithEmailAndPassword(
      this.#auth,
      form.email,
      form.password
    );
    const { uid, displayName, email, refreshToken, photoURL } = user;
    this.#setUserFromSessionStorage(
      new User({ uid, displayName, email, refreshToken, photoURL })
    );
    this.#currentUserLogged.set(this.#getUserFromSessionStorage());
  }

  #getUserFromSessionStorage(): User | null {
    const user = sessionStorage.getItem('currentUserLogged');
    const userAuthenticated = user ? JSON.parse(user) : null;
    return userAuthenticated;
  }

  #setUserFromSessionStorage(userLogged: User): User | null {
    sessionStorage.setItem('currentUserLogged', JSON.stringify(userLogged));
    return userLogged;
  }

  async createNewAccount(form: register): Promise<User | null> {
    const userCredential = await createUserWithEmailAndPassword(
      this.#auth,
      form.email,
      form.password
    );
    const user = userCredential.user;
    const { uid, displayName, email, refreshToken, photoURL } = user;
    await updateProfile(user, { displayName });
    const userLogged = {
      uid,
      email,
      displayName,
      refreshToken,
      photoURL,
    };

    await setDoc(doc(this.#firestore, `users/${user.uid}`), userLogged);
    if (user.refreshToken) {
      this.#setUserFromSessionStorage(new User(userLogged));
      this.#currentUserLogged.set(this.#getUserFromSessionStorage());
    }
    return null;
  }

  getCurrentUserLogged() {
    return this.#currentUserLogged();
  }

  logout() {
    sessionStorage.removeItem('currentUserLogged');
    this.#currentUserLogged.set(null);
    from(signOut(this.#auth));
    this.#router.navigateByUrl('/authentication/login');
    return;
  }
}
