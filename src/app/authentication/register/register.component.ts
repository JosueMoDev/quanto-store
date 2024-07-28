import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonInputPasswordToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export default class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  // private authenticationService = inject(AuthenticationService);
  private formBuider = inject(FormBuilder);
  public registerForm: FormGroup = this.formBuider.group({
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
  });

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  createNewAccount() {
    console.log(this.registerForm.value);
  }
}
