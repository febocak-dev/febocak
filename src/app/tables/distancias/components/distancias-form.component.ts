import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';

import { CompetenciaI } from '@models/competencia';
import { CategoriaI } from '@models/categoria';

@Component({
  selector: 'app-distancias-form',
  templateUrl: './distancias-form.component.html',
  styles: ['']
})
export class DistanciasFormComponent implements OnInit {
  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;

  competencia: CompetenciaI;
  tblCategoria: CategoriaI[];

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
    this.competencia = { 
      id: this.actRoute.snapshot.paramMap.get('idCompetencia'),
      ...this.actRoute.snapshot.data['distanciaData'][0]
    };
    this.tblCategoria = this.actRoute.snapshot.data['distanciaData'][1];
    
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
    const record = this.competencia.distancia[this.templateData.id];
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
    
    this.prepararArreglo(this.templateData.titulo);
    this.guardar();
  }
  
  prepararArreglo(parAccion: string) {
    let objDistancia = {
      categoria: this.miForm.controls.categoria.value,
      embarcacion: this.miForm.controls.embarcacion.value,
      distancia: this.miForm.controls.distancia.value,
    }
    if (!this.competencia.distancia) {
      this.competencia = {...this.competencia, distancia: [objDistancia]}
    } else if (parAccion === 'Agregar') {
      this.competencia.distancia.push(objDistancia)
    } else if (parAccion === 'Modificar') {
      this.competencia.distancia.splice(+this.templateData.id, 1, objDistancia)
    } else if (parAccion === 'Eliminar') {
      this.competencia.distancia.splice(+this.templateData.id, 1)
    }
  }

  guardar() {
    this.crudService.updateRecord$('competencias', this.competencia.id, this.competencia).subscribe(
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

}
