import {  inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { from } from 'rxjs';

type login = { email: string; password: string };
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth = inject(Auth);

  async login(form: login): Promise<any> {
    const { user } = await signInWithEmailAndPassword(this.auth, form.email, form.password);
    const currentUserLogged = {
      email: user.email,
      id: user.uid,
      token: user.refreshToken,
    }
    sessionStorage.setItem('currentUserLogged', JSON.stringify(currentUserLogged));
  }

  
  logout() {
    sessionStorage.removeItem('currentUserLogged');
    return from(signOut(this.auth));
  }
}
