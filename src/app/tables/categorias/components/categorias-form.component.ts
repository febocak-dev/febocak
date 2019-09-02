import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';

import { CategoriaI } from '@models/categoria';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styles: []
})
export class CategoriasFormComponent implements OnInit {
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
      desde: ['', [Validators.required, Validators.min(1900), Validators.max(2020)] ],
      hasta: ['', [Validators.required, Validators.min(1900), Validators.max(2020)] ],
      genero: ['', [Validators.required] ],
      categoria: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  setFormData() {
    const record = this.actRoute.snapshot.data['categoriaData'];
    this.miForm.patchValue(record);
    if (this.templateData.titulo==='Eliminar') {
      this.miForm.controls.genero.disable();
    }
  }

  get desde() {
    return this.miForm.get('desde');
  }
  get hasta() {
    return this.miForm.get('hasta');
  }
  get genero() {
    return this.miForm.get('genero');
  }
  get categoria() {
    return this.miForm.get('categoria');
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
  
  aceptarAgregar(record: CategoriaI) {
    this.crudService.addRecord$('categorias', record).subscribe(
      _ => this.msg.ok(this.miForm.controls['categoria'].value + ' Agregado satisfactoriamente'),
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['categorias'])
    );
  }

  aceptarEditar(record: CategoriaI) {
    this.crudService.updateRecord$('categorias', record.id, record).subscribe(
      _ => this.msg.ok(record.categoria + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['categorias'])
    );
  }

  aceptarEliminar(record: CategoriaI) {
    this.crudService.deleteRecord$('categorias', record.id).subscribe(
      _ => this.msg.ok(record.categoria + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['categorias'])
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
