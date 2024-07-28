import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    ReactiveFormsModule,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonInputPasswordToggle,
  ],
})
export default class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  public hide = true;
  // private authenticationService = inject(AuthenticationService);
  private formBuider = inject(FormBuilder);
  public loginForm: FormGroup = this.formBuider.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginWithEmailAndPassword() {
    console.log(this.loginForm.value)
    
  }
}
