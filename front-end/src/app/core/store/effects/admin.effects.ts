import { inject,Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../../services/admin.service';
import * as AdminActions from '../actions/admin.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private adminService = inject(AdminService);
  private router = inject(Router);

  constructor() {
    console.log('AdminEffects initialized with inject()');
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.adminLoginStart),
      mergeMap(({ email, password }) =>
        this.adminService.login({ email, password }).pipe(
          map((res) => AdminActions.adminLoginSuccess({ token: res.token! })),
          catchError((err) =>
            of(
              AdminActions.adminLoginFailure({
                error: err.error?.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.adminLoginSuccess),
        tap(({ token }) => {
          this.adminService.saveToken(token);
          this.router.navigate(['/admin/dashboard']);
        })
      ),
    { dispatch: false }
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadUsers),
      mergeMap(() =>
        this.adminService.getAllUsers().pipe(
          map((users) => AdminActions.loadUsersSuccess({ users })),
          catchError((err) =>
            of(
              AdminActions.loadUsersFailure({
                error: err.error?.message || 'Failed to load users',
              })
            )
          )
        )
      )
    )
  );


  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createUserStart),
      mergeMap(({ user }) =>
        this.adminService.createUser(user).pipe(
          map((res: any) => {
            alert('User created successfully');
            return AdminActions.createUserSuccess({ user: res.user });
          }),
          catchError((err) => {
            alert(err.error?.message || 'Failed to create user');
            return of(
              AdminActions.createUserFailure({
                error: err.error?.message || 'Error creating user',
              })
            );
          })
        )
      )
    )
  );

  
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateUserStart),
      mergeMap(({ id, user }) =>
        this.adminService.updateUser(id, user).pipe(
          map((res: any) => {
            alert('User updated successfully');
            return AdminActions.updateUserSuccess({ user: res.updatedUser });
          }),
          catchError((err) => {
            alert(err.error?.message || 'Failed to update user');
            return of(
              AdminActions.updateUserFailure({
                error: err.error?.message || 'Error updating user',
              })
            );
          })
        )
      )
    )
  );


  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteUserStart),
      mergeMap(({ id }) =>
        this.adminService.deleteUser(id).pipe(
          map(() => {
            alert('User deleted successfully');
            return AdminActions.deleteUserSuccess({ id });
          }),
          catchError((err) => {
            alert(err.error?.message || 'Failed to delete user');
            return of(
              AdminActions.deleteUserFailure({
                error: err.error?.message || 'Error deleting user',
              })
            );
          })
        )
      )
    )
  );

    adminLogout$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AdminActions.adminLogout),
          tap(() => {
            this.adminService.logout();
            this.router.navigate(['/admin/login']);
          })
        ),
      { dispatch: false }
    );
}
