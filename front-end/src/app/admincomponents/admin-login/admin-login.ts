import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/reducers';
import * as AdminActions from '../../core/store/actions/admin.actions';
import { selectAdminError, selectAdminLoading } from '../../core/store/selectors/admin.selectors';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLogin implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  loading$: any;
  error$: any;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });


    this.loading$ = this.store.select(selectAdminLoading);
    this.error$ = this.store.select(selectAdminError);

    this.error$.subscribe((err:any) => {
      if (err) this.errorMessage = err;
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.store.dispatch(AdminActions.adminLoginStart({ email, password }));
  }
}
