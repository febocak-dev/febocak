import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@core/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  retornar = '';

  constructor(private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute,
              private msgService: MessageService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.retornar = params['retornar'] || '/home');
  }

  onLogin() {
    this.msgService.clearMessages();
    this.authService.login$(this.email, this.password).subscribe(
      () => this.router.navigate([this.retornar]),
      error => this.msgService.error('Error: Ocurrió un error' + error + ' verifique el email y la contraseña')
    );
  }

}
