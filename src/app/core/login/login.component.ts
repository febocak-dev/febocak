import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '@core/message/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  modulo = environment.modulo;
  email = '';
  password = '';
  retornar = '';

  constructor(private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute,
              private msg: MessageService) {
  }

  ngOnInit() {
   this.route.queryParams
      .subscribe(params => this.retornar = params['retornar'] || '/home');
  }
   
  onLogin() {
    this.modulo === 'Competencias' ? this.onLoginLocalStorage() : this.onLoginFirebase();
  }

 onLoginFirebase() {
    this.msg.clearMessages();
    this.authService.login$(this.email, this.password).subscribe(
      () => this.router.navigate([this.retornar]),
      error => this.msg.error('Error: Ocurrió un error' + error + ' verifique el email y la contraseña')
    );
  }

  onLoginLocalStorage() {
    this.msg.clearMessages();
    this.authService.loginLocal$(this.email, this.password).subscribe(
      () => {
        this.router.navigate([this.retornar])
      },
      error => this.msg.error('Error: Ocurrió un error, verifique el email y la contraseña')
    );

  }
}
