import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginCredentials } from '../../core/models/user.model';
import * as AuthActions from '../../core/store/actions/auth.actions';
import {
  selectAuthLoading,
  selectAuthError,
  selectIsLoggedIn,
} from '../../core/store/selectors/auth.selectors';
import { AppState } from '../../core/store/reducers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    console.log('-------------');

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.store.dispatch(AuthActions.loginStart({ credentials }));
    } else {
      console.log('Form is invalid');
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
