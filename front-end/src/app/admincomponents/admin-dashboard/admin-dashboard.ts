// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AdminService } from '../../core/services/admin.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   templateUrl: './admin-dashboard.html',
//   styleUrls: ['./admin-dashboard.css']
// })
// export class AdminDashboard {
//   constructor(private adminService: AdminService, private router: Router) {}

//   logout() {
//     this.adminService.logout();
//     this.router.navigate(['/admin/login']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {
  users: any[] = [];
  searchTerm = '';

  showAddModal = false;
  newUser = { name: '', email: '', password: '' };

  showEditModal = false;
  editUserData: any = { name: '', email: '', _id: '' };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  searchUsers() {
    if (!this.searchTerm.trim()) {
      this.loadUsers();
      return;
    }
    this.adminService.searchUsers(this.searchTerm).subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Search failed:', err),
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err),
      });
    }
  }

  //   editUser(id: string) {
  //   // Navigate to edit page or open modal (you can implement this later)
  //   console.log('Edit user with ID:', id);
  // }

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

    this.adminService.createUser(this.newUser).subscribe({
      next: () => {
        alert('User created successfully');
        this.closeAddUserModal();
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert(err.error?.message || 'Failed to create user');
      },
    });
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
    this.adminService
      .updateUser(this.editUserData._id, this.editUserData)
      .subscribe({
        next: () => {
          alert('User updated successfully');
          this.closeEditModal();
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error updating user:', err);
          alert(err.error?.message || 'Failed to update user');
        },
      });
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }
}
