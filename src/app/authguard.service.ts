import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthguardService {

  constructor(private router: Router) { }

  public canActivate(): boolean {
    const token = localStorage.getItem('currentUser');
    if (token == null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
}

}
