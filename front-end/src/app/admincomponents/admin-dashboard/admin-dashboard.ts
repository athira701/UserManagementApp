import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/reducers';
import * as AdminActions from '../../core/store/actions/admin.actions';
import {
  selectAdminUsers,
  selectAdminLoading,
} from '../../core/store/selectors/admin.selectors';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {
  users$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  allUsers: any[] = [];
  filteredUsers: any[] = [];

  searchTerm = '';
  showAddModal = false;
  newUser = { name: '', email: '', password: '' };
  showEditModal = false;
  editUserData: any = { name: '', email: '', _id: '' };

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.store.select(selectAdminUsers);
    this.loading$ = this.store.select(selectAdminLoading);

    this.users$.subscribe((users) => {
      this.allUsers = users;
      this.searchUsers();
    });

    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(AdminActions.loadUsers());
  }

  searchUsers() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.allUsers;
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(AdminActions.deleteUserStart({ id }));
    }
  }

  openAddUserModal() {
    this.showAddModal = true;
  }

  closeAddUserModal() {
    this.showAddModal = false;
    this.newUser = { name: '', email: '', password: '' };
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('All fields are required!');
      return;
    }

    this.store.dispatch(AdminActions.createUserStart({ user: this.newUser }));
    this.closeAddUserModal();
  }

  openEditModal(user: any) {
    this.editUserData = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editUserData = { name: '', email: '', _id: '' };
  }

  updateUser() {
    if (!this.editUserData.name || !this.editUserData.email) {
      alert('Name and Email are required!');
      return;
    }

    this.store.dispatch(
      AdminActions.updateUserStart({
        id: this.editUserData._id,
        user: this.editUserData,
      })
    );
    this.closeEditModal();
  }

  logout() {
    this.store.dispatch(AdminActions.adminLogout());
    this.router.navigate(['/admin/login']);
  }
}
