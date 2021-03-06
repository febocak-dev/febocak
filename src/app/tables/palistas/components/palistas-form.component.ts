import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';

import { ClubI } from '@models/club';
import { PalistaI } from '@models/palista';
import { CategoriaI } from '@models/categoria';
import { ArrayService } from '@services/array.service';
import { UserI } from '@models/user';

@Component({
  selector: 'app-palistas-form',
  templateUrl: './palistas-form.component.html',
  styles: ['']
})
export class PalistasFormComponent implements OnInit {
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;
  tblClubes: ClubI[];
  tblCategorias: CategoriaI[];

  constructor(
    private crudService: CrudService, 
    private fb: FormBuilder,      
    private msg: MessageService,
    private location: Location, 
    private actRoute: ActivatedRoute,
    private router: Router,
    private arrayService: ArrayService) {
  }

  ngOnInit() {
    this.msg.clearMessages();
    const usuario: UserI = this.actRoute.snapshot.data['palistaData'][4];
    this.tblClubes = [ { nombre: usuario.club } ];
    this.tblCategorias = this.actRoute.snapshot.data['palistaData'][2];

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
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/) ] ],
      numero: ['', [Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/) ] ],
      apellido: ['', [Validators.required, Validators.minLength(2)] ],
      nombre: ['', [Validators.required, Validators.minLength(2)] ],
      fnacimiento: ['', [Validators.required] ],
      genero: ['', [Validators.required] ],
      categoria: ['', [Validators.required] ],
      club: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.miForm.controls.club.setValue(this.tblClubes[0].nombre);
  }

  setFormData() {
    const record = this.actRoute.snapshot.data['palistaData'][0];
    this.miForm.patchValue(record);
    if (this.templateData.titulo==='Eliminar') {
      this.miForm.controls.club.disable();
    }
  }

  get dni() {
    return this.miForm.get('dni');
  }
  get numero() {
    return this.miForm.get('numero');
  }
  get apellido() {
    return this.miForm.get('apellido');
  }
  get nombre() {
    return this.miForm.get('nombre');
  }
  get fnacimiento() {
    return this.miForm.get('fnacimiento');
  }
  get genero() {
    return this.miForm.get('genero');
  }
  get categoria() {
    return this.miForm.get('categoria');
  }
  get club() {
    return this.miForm.get('club');
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    const record = { 
      id: this.templateData.id,
     palista: this.miForm.controls.nombre.value.trim() + ' ' + this.miForm.controls.apellido.value,
      ...this.miForm.value };

    if (this.templateData.titulo !== 'Eliminar' && !this.validations(record)) {
      submitBtn.disabled = false;
      return;
    }

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
  
  aceptarAgregar(record: PalistaI) {
    this.crudService.addRecord$('palistas', record).subscribe(
      _ => this.msg.ok(record.nombre.trim() + ' ' + record.apellido + ' Agregado satisfactoriamente'),
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['palistas'])
    );
  }

  aceptarEditar(record: PalistaI) {
    this.crudService.updateRecord$('palistas', record.id, record).subscribe(
      _ => this.msg.ok(record.nombre.trim() + ' ' + record.apellido + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['palistas'])
    );
  }

  aceptarEliminar(record: PalistaI) {
    this.crudService.deleteRecord$('palistas', record.id).subscribe(
      _ => this.msg.ok(record.nombre.trim() + ' ' + record.apellido + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['palistas'])
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

  buscarCategoria(fecha: string, genero: string) {
    
    const año = parseInt( fecha.substring(0,4));
    if (!año || año < 1900) {
      this.miForm.controls.categoria.setValue('No se encontró')
    } else {
      const categoria = this.tblCategorias.find( el => año >= el.desde && año <= el.hasta && el.genero.includes(genero)).categoria
      this.miForm.controls.categoria.setValue(categoria);
    }
  }

  validations(record) {
    const tabla = this.actRoute.snapshot.data['palistaData'][3];
    const errorMessages = [];
    errorMessages.push('Ya hay otro registro con los mismos valores para los campos nombre y apellido');
    errorMessages.push('Ya hay otro registro con el mismo DNI');
    const objSearch = [];
    objSearch.push({ nombre: record.nombre, apellido: record.apellido });
    objSearch.push({ dni: record.dni });
    if (!!record.numero) {
      errorMessages.push('Ya hay otro registro con el mismo Número de Federado');
      objSearch.push({ numero: record.numero });
    }

    for (let i = 0; i < objSearch.length; i++) {
      const encontro = this.arrayService.find(tabla, objSearch[i]);
      if (!!encontro) {
        if (this.templateData.titulo === 'Agregar') {
          this.msg.warning(errorMessages[i]);
          return false;
        } else {
          if(record.id !== encontro.id) {
            this.msg.warning(errorMessages[i]);
            return false;
          }
        }
      }
    }
    return true;
  }
}
