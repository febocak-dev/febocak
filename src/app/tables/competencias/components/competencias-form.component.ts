import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { ArrayService } from '@services/array.service';

import { ClubI } from '@models/club';
import { CompetenciaI } from '@models/competencia';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Component({
  selector: 'app-competencias-form',
  templateUrl: './competencias-form.component.html',
  styles: ['']
})
export class CompetenciasFormComponent implements OnInit {
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;
  tblClubes: ClubI[];
  tblTipos: TipoDeCompetenciaI[];

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
    this.tblClubes = this.actRoute.snapshot.data['competenciaData'][1];
    this.tblTipos = this.actRoute.snapshot.data['competenciaData'][2];

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
      desde: ['', [Validators.required] ],
      hasta: ['', [Validators.required] ],
      competencia: ['', [Validators.required, Validators.minLength(3)] ],
      tipoDeCompetencia: ['', [Validators.required] ],
      club: ['', [Validators.required] ]
    });
  }

  setFormData() {
    const record = this.actRoute.snapshot.data['competenciaData'][0];
    this.miForm.patchValue(record);
    if (this.templateData.titulo==='Eliminar') {
      this.miForm.controls.club.disable();
      this.miForm.controls.tipoDeCompetencia.disable();
    }
  }

  get desde() {
    return this.miForm.get('desde');
  }
  get hasta() {
    return this.miForm.get('hasta');
  }
  get competencia() {
    return this.miForm.get('competencia');
  }
  get tipoDeCompetencia() {
    return this.miForm.get('tipoDeCompetencia');
  }
  get club() {
    return this.miForm.get('club');
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    const record = { id: this.templateData.id,...this.miForm.value }

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
  
  aceptarAgregar(record: CompetenciaI) {
    this.crudService.addRecord$('competencias', record).subscribe(
      _ => this.msg.ok(this.miForm.controls['competencia'].value + ' Agregado satisfactoriamente'),
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['competencias'])
    );
  }

  aceptarEditar(record: CompetenciaI) {
    this.crudService.updateRecord$('competencias', record.id, record).subscribe(
      _ => this.msg.ok(record.competencia + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['competencias'])
    );
  }

  aceptarEliminar(record: CompetenciaI) {
    this.crudService.deleteRecord$('competencias', record.id).subscribe(
      _ => this.msg.ok(record.competencia + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['competencias'])
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
    const tabla = this.actRoute.snapshot.data['competenciaData'][3];
    const errorMessages = [];
    errorMessages.push('Ya hay otro registro con el mismo valor para el campo desde');
    errorMessages.push('Ya hay otro registro con el mismo valor para el campo hasta');
    errorMessages.push('Ya hay otro registro con el mismo valor para el campo descripción');
    const objSearch = [];
    objSearch.push({ desde: record.desde });
    objSearch.push({ hasta: record.hasta });
    objSearch.push({ competencia: record.competencia });

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
