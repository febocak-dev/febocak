import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { ArrayService } from '@services/array.service';

import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';
import { CategoriaI } from '@models/categoria';

@Component({
  selector: 'app-distancias-form',
  templateUrl: './distancias-form.component.html',
  styles: ['']
})
export class DistanciasFormComponent implements OnInit {
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;

  tCompetencia: TipoDeCompetenciaI;
  tblCategoria: CategoriaI[];

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
    const data = this.actRoute.snapshot.data['distanciaData']
    this.tCompetencia = { 
      ...this.actRoute.snapshot.data['distanciaData'][0],
      id: this.actRoute.snapshot.paramMap.get('idTipoDeCompetencia')
    };
    this.tblCategoria = this.actRoute.snapshot.data['distanciaData'][1];
    this.tblCategoria = this.arrayService.sort(this.tblCategoria, ['desde'])
    
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
      categoria: ['', [Validators.required] ],
      embarcacion: ['', [Validators.required] ],
      distancia: ['', [Validators.required] ]
    });
  }

  setFormData() {
    const record = this.tCompetencia.distancia[this.templateData.id];
    this.miForm.patchValue(record);
    if (this.templateData.titulo==='Eliminar') {
      this.miForm.controls.categoria.disable();
    }
  }

  get embarcacion() {
    return this.miForm.get('embarcacion');
  }
  get distancia() {
    return this.miForm.get('distancia');
  }
  get categoria() {
    return this.miForm.get('categoria');
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    const record = { id: this.templateData.id, ...this.miForm.value }

    if (this.templateData.titulo !== 'Eliminar' && !this.validations(record)) {
      submitBtn.disabled = false;
      return;
    }

    this.prepararArreglo(this.templateData.titulo);
    this.guardar();
  }
  
  prepararArreglo(parAccion: string) {
    let objDistancia = {
      categoria: this.miForm.controls.categoria.value,
      embarcacion: this.miForm.controls.embarcacion.value,
      distancia: this.miForm.controls.distancia.value,
    }
    if (!this.tCompetencia.distancia) {
      this.tCompetencia = {...this.tCompetencia, distancia: [objDistancia]}
    } else if (parAccion === 'Agregar') {
      this.tCompetencia.distancia.push(objDistancia)
    } else if (parAccion === 'Modificar') {
      this.tCompetencia.distancia.splice(+this.templateData.id, 1, objDistancia)
    } else if (parAccion === 'Eliminar') {
      this.tCompetencia.distancia.splice(+this.templateData.id, 1)
    }
  }

  guardar() {
    this.crudService.updateRecord$('tipos-de-competencias', this.tCompetencia.id, this.tCompetencia).subscribe(
      _ => this.msg.ok(this.miForm.controls['distancia'].value + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.goBack()
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
    const tabla = this.tCompetencia.distancia ? this.tCompetencia.distancia : [];
    const errorMessages = [];
    errorMessages.push('Ya hay otro registro con los mismos valores para los campos categoria, embarcación y distancia');
    const objSearch = [];
    objSearch.push({ categoria: record.categoria, embarcacion: record.embarcacion, distancia: record.distancia });

    for (let i = 0; i < objSearch.length; i++) {
      const index = this.arrayService.findIndex(tabla, objSearch[i]);

      if (index >= 0) {
        if (this.templateData.titulo === 'Agregar') {
          this.msg.warning(errorMessages[i]);
          return false;
        } else {
          if(+record.id !== index) {
            this.msg.warning(errorMessages[i]);
            return false;
          }
        }
      }
    }
    return true;
  }

}
