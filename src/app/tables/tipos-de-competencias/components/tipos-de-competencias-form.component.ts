import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { ArrayService } from '@services/array.service';

import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Component({
  selector: 'app-tipos-de-competencias-form',
  templateUrl: './tipos-de-competencias-form.component.html',
  styles: []
})
export class TiposDeCompetenciasFormComponent implements OnInit {
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;

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
      tipo: ['', [Validators.required] ],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });

  }

  setFormData() {
    const record = this.actRoute.snapshot.data['tipoDeCompetenciaData'][0];
    this.miForm.patchValue(record);
  }

  get tipo() {
    return this.miForm.get('tipo');
  }
  get descripcion() {
    return this.miForm.get('descripcion');
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    const record = { id: this.templateData.id,...this.miForm.value }

    if (!this.validations(record)) {
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
  
  aceptarAgregar(record: TipoDeCompetenciaI) {
    this.crudService.addRecord$('tipos-de-competencias', record).subscribe(
      _ => this.msg.ok(this.miForm.controls['tipo'].value + ' Agregado satisfactoriamente'),
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['tipos-de-competencias'])
    );
  }

  aceptarEditar(record: TipoDeCompetenciaI) {
    this.crudService.updateRecord$('tipos-de-competencias', record.id, record).subscribe(
      _ => this.msg.ok(record.tipo + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['tipos-de-competencias'])
    );
  }

  aceptarEliminar(record: TipoDeCompetenciaI) {
    this.crudService.deleteRecord$('tipos-de-competencias', record.id).subscribe(
      _ => this.msg.ok(record.tipo + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['tipos-de-competencias'])
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

  validations(record) {
    const tabla = this.actRoute.snapshot.data['tipoDeCompetenciaData'][1];
    const errorMessages = [];
    errorMessages.push('Ya hay otro registro con el mismo tipo');
    errorMessages.push('Ya hay otro registro con la mismas descripción');
    const objSearch = [];
    objSearch.push({ tipo: record.tipo });
    objSearch.push({ descripcion: record.descripcion });

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
