import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../core/store/reducers';
import { selectUser } from '../../core/store/selectors/auth.selectors';
import * as AuthActions from '../../core/store/actions/auth.actions';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const profileImage = localStorage.getItem('profileImage');

    if (token && email && name) {
      this.store.dispatch(
        AuthActions.loginSuccess({
          response: { token, user: { _id, name, email, profileImage } },
        })
      );
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadImage(userEmail: string | null | undefined): void {
    if (!this.selectedFile || !userEmail) {
      alert('No file selected or email missing');
      return;
    }

    this.authService
      .uploadProfileImage(this.selectedFile, userEmail)
      .subscribe({
        next: (response: any) => {
          const updatedUser = response.user;

          localStorage.setItem('userName', updatedUser.name);
          localStorage.setItem('userEmail', updatedUser.email);
          localStorage.setItem('profileImage', updatedUser.profileImage);
          localStorage.setItem('userId', updatedUser._id);

          this.store.dispatch(
            AuthActions.loginSuccess({
              response: {
                token: localStorage.getItem('token') || '',
                user: updatedUser,
              },
            })
          );

          alert('Profile image updated!');
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload image');
        },
      });
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
