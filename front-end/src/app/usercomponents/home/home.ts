import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/store/reducers';
import * as AuthActions from '../../core/store/actions/auth.actions';
import {
  selectUser,
  selectIsLoggedIn,
} from '../../core/store/selectors/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  user$: Observable<any>;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token') ?? '';
    const _id = localStorage.getItem('userId') ?? '';
    const name = localStorage.getItem('userName') ?? '';
    const email = localStorage.getItem('userEmail') ?? '';
    const profileImage = localStorage.getItem('profileImage') ?? '';

    if (token && name && email) {
      this.store.dispatch(
        AuthActions.loginSuccess({
          response: { token, user: { _id, name, email, profileImage } },
        })
      );
    }
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
