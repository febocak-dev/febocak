import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';

import { ClubI } from '@models/club';

@Component({
  selector: 'app-clubes-form',
  templateUrl: './clubes-form.component.html',
  styles: []
})
export class ClubesFormComponent implements OnInit {
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;

  constructor(
    private crudService: CrudService, 
    private fb: FormBuilder,      
    private msg: MessageService,
    private location: Location, 
    private actRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.msg.clearMessages();

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
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      delegado: ['', [Validators.required, Validators.minLength(3)]],
      entrenador: ['', [Validators.required, Validators.minLength(3)]]
    });
    
  }

  setFormData() {
    this.miForm.patchValue(this.actRoute.snapshot.data['clubData']);

  }

  get nombre() {
    return this.miForm.get('nombre');
  }
  get descripcion() {
    return this.miForm.get('descripcion');
  }
  get delegado() {
    return this.miForm.get('delegado');
  }
  get entrenador() {
    return this.miForm.get('entrenador');
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
  
  aceptarAgregar(record: ClubI) {
    this.crudService.addRecord$('clubes', record).subscribe(
      _ => this.msg.ok(this.miForm.controls['nombre'].value + ' Agregado satisfactoriamente'),
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['clubes'])
    );
  }

  aceptarEditar(record: ClubI) {
    this.crudService.updateRecord$('clubes', record.id, record).subscribe(
      _ => this.msg.ok(record.nombre + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['clubes'])
    );
  }

  aceptarEliminar(record: ClubI) {
    this.crudService.deleteRecord$('clubes', record.id).subscribe(
      _ => this.msg.ok(record.nombre + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['clubes'])
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
