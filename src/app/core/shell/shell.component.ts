import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { SpinnerService } from '@core/spinner/spinner.service';
import { UserI } from '@models/user';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styles: []
})
export class ShellComponent implements OnInit {
  public usuario$: Observable<UserI>; 
  public loading$: Observable<boolean>;
  public modulo = environment.modulo;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private spinner: SpinnerService) { 
      router.events.subscribe((routerEvent: Event) => {
        this.checkRouterEvent(routerEvent);
      });
  }

  ngOnInit() {
    this.loading$ = this.spinner.getSpinner();
    this.usuario$ = this.authService.getUser$();
    
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.spinner.on();
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.spinner.off();
    }
  }

}
