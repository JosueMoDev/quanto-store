import { Component, inject } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  ToastController,
  
} from '@ionic/angular/standalone';
import { AuthenticationService } from '@services/authentication.service';

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
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ],
})
export default class LoginComponent {
  private authenticationService = inject(AuthenticationService);
  private formBuider = inject(FormBuilder);
  private toastController = inject(ToastController);
  private router = inject(Router);

  public loginForm: FormGroup = this.formBuider.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  async loginWithEmailAndPassword() {
    try {
      await this.authenticationService.login(this.loginForm.value); 
      this.router.navigateByUrl('/home/products')
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Login failed. Please try again.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
