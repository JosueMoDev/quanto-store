import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
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
  ToastController,
} from '@ionic/angular/standalone';
import { AuthenticationService } from '@services/authentication.service';

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
export default class RegisterComponent {
  private authenticationService = inject(AuthenticationService);
  private formBuider = inject(FormBuilder);
  private router = inject(Router);
  private toastController = inject(ToastController);

  public registerForm: FormGroup = this.formBuider.group(
    {
      displayName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.passwordMatchValidator() }
  );

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      return password &&
        confirmPassword &&
        password.value !== confirmPassword.value
        ? { passwordMismatch: true }
        : null;
    };
  }

  get passwordMismatch() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    return (
      confirmPasswordControl?.touched &&
      this.registerForm.hasError('passwordMismatch')
    );
  }

  async createNewAccount() {
    try {
      await this.authenticationService.createNewAccount(
        this.registerForm.value
      );
      this.router.navigateByUrl('/home/products');
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Register failed. Please try again.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
