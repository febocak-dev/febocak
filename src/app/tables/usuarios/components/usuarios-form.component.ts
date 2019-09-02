import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { AuthService } from '@services/auth.service';

import { compareValidator } from '../../../shared/compare-validator.directive';

import { ClubI } from '@models/club';
import { UserI } from '@models/user';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styles: ['']
})
export class UsuariosFormComponent implements OnInit {
  uniqueEmail;
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;
  tblClubes: ClubI[];

  constructor(
    private crudService: CrudService, 
    private authService: AuthService,
    private fb: FormBuilder,      
    private msg: MessageService,
    private location: Location, 
    private actRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.msg.clearMessages();
    this.tblClubes = this.actRoute.snapshot.data['usuarioData'][1];

    const action = this.actRoute.snapshot.paramMap.get('action');
    this.templateData.titulo = this.getTitle(action);
    this.templateData.cardHeaderStyle = this.getClassHeader(action);
    this.templateData.id = this.actRoute.snapshot.paramMap.get('id');

    this.buildForm();
    if (this.templateData.titulo !== 'Agregar') {
      this.setFormData();
    }
  }

  buildForm() {
    
    this.miForm = this.fb.group({
      name: ['', [Validators.required] ],
      email: ['', [Validators.required] ],
      rol: ['', [Validators.required]],
      club: ['', [Validators.required] ],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      password2: ['', [Validators.required, Validators.minLength(6), compareValidator('password')] ]
    });

    if (this.templateData.titulo !== 'Agregar') {
      this.miForm.removeControl('password');
      this.miForm.removeControl('password2');
    }

  }

  setFormData() {
    const record = this.actRoute.snapshot.data['usuarioData'][0];
    this.miForm.patchValue(record);
    if (this.templateData.titulo==='Eliminar') {
      this.miForm.controls.club.disable();
      this.miForm.controls.rol.disable();
    }
  }

  get name() {
    return this.miForm.get('name');
  }
  get email() {
    return this.miForm.get('email');
  }
  get club() {
    return this.miForm.get('club');
  }
  get rol() {
    return this.miForm.get('rol');
  }
  get password() {
    return this.miForm.get('password');
  }
  get password2() {
    return this.miForm.get('password2');
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    
    const record = { id: this.templateData.id,...this.miForm.value }
    switch (this.templateData.titulo) {
      case 'Agregar':
        this.aceptarAgregar(record);
        break;
      case 'Modificar':
        this.aceptarEditar(record);
        break;
      case 'Eliminar':
        this.aceptarEliminar(record);
        break;
    }
  }
  
  aceptarAgregar(record: UserI) {
    this.crudService.addRecord$('users', record).subscribe(
      _ => {
        this.authService.afAuth.auth.createUserWithEmailAndPassword(record.email, record.password).then(
          () => this.msg.ok(this.miForm.controls['name'].value + ' Agregado satisfactoriamente'),
          error => this.msg.error('Error al agregar los datos: ' + error.statusText)
        )
      },
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['usuarios'])
    );
  }

  aceptarEditar(record: UserI) {
    this.crudService.updateRecord$('users', record.id, record).subscribe(
      _ => this.msg.ok(record.name + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['usuarios'])
    );
  }

  aceptarEliminar(record: UserI) {
    this.crudService.deleteRecord$('users', record.id).subscribe(
      _ => this.msg.ok(record.name + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['usuarios'])
    );
  }

  goBack() {
    this.location.back();
  }

  getTitle(action: string) {
    const objTitle= {add:'Agregar', edit: 'Modificar', delete: 'Eliminar'};
    return objTitle[action];
  }
  
  getClassHeader(action: string) {
    const objStyle = {add:'bg-primary', edit: 'bg-warning', delete: 'bg-danger'};
    return objStyle[action];
  }

}
