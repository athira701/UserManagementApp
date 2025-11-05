import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  const token = adminService.getToken();

 
  if (!token || !adminService.isLoggedIn()) {
    router.navigate(['/admin/login']);
    return false;
  }else{
     return true;
  }
 
};


export const adminLoginGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  const token = adminService.getToken();


  if (token && adminService.isLoggedIn()) {
    router.navigate(['/admin/dashboard']);
    return false;
  }

  
  return true;
};