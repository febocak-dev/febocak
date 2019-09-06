import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';

import { ClubI } from '@models/club';
import { PalistaI } from '@models/palista';
import { CategoriaI } from '@models/categoria';
import { InscripcionI } from '@models/inscripcion';
import { DistanciaI } from '@models/competencia';
import { ArrayService } from '@services/array.service';

@Component({
  selector: 'app-inscripciones-form',
  templateUrl: './inscripciones-form.component.html',
  styles: ['']
})
export class InscripcionesFormComponent implements OnInit {
  @ViewChild('selectDistancia', {static: true}) selectDistancia: ElementRef;

  templateData = { titulo: '', cardHeaderStyle: '', id: '' };
  miForm: FormGroup;
  tblClubes: ClubI[];
  tblCategorias: CategoriaI[];
  tblPalistas: PalistaI[];
  tblInscripciones: InscripcionI[];
  tblDistancias: DistanciaI[];

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
    this.tblClubes = this.actRoute.snapshot.data['inscripcionData'][1];
    this.tblCategorias = this.actRoute.snapshot.data['inscripcionData'][2];
    this.tblPalistas = this.actRoute.snapshot.data['inscripcionData'][3];
    this.tblInscripciones = this.actRoute.snapshot.data['inscripcionData'][4];

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
      palista: ['', [Validators.required, Validators.minLength(3)]],
      dni: [''],
      apellido: [''],
      nombre: [''],
      fnacimiento: [''],
      genero: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      club: ['', [Validators.required]],
      distancia: [[], [Validators.required]]

    });
    this.miForm.controls.club.disable();
    
  }

  setFormData() {
    const record = this.actRoute.snapshot.data['inscripcionData'][0];
    this.miForm.patchValue(record);
    this.tblDistancias = this.distanciasDeLaCategoria(record.categoria);
    this.marcarDistancias(record.distancia);
    this.miForm.controls.palista.disable();
    this.miForm.controls.club.disable();

    if (this.templateData.titulo==='Eliminar') {
      this.miForm.controls.distancia.disable();
    }
  }

  get palista() {
    return this.miForm.get('palista');
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
  get distancia() {
    return this.miForm.get('distancia');
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.miForm.controls.club.enable();
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
  
  aceptarAgregar(record: PalistaI) {
    console.log('TCL: InscripcionesFormComponent -> aceptarAgregar -> record', record)
    
    this.crudService.addRecord$('inscripciones', record).subscribe(
      _ => this.msg.ok(record.nombre.trim() + ' ' + record.apellido + ' Agregado satisfactoriamente'),
      error => this.msg.error('Error al agregar los datos: ' + error.statusText),
      () => this.router.navigate(['inscripciones'])
    );
  }

  aceptarEditar(record: PalistaI) {
    this.crudService.updateRecord$('inscripciones', record.id, record).subscribe(
      _ => this.msg.ok(record.nombre.trim() + ' ' + record.apellido + ' Actualizado satisfactoriamente'),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => this.router.navigate(['inscripciones'])
    );
  }

  aceptarEliminar(record: PalistaI) {
    this.crudService.deleteRecord$('inscripciones', record.id).subscribe(
      _ => this.msg.ok(record.nombre.trim() + ' ' + record.apellido + ' Eliminado satisfactoriamente'),
      error => this.msg.error('Error al eliminar los datos: ' + error.statusText),
      () => this.router.navigate(['inscripciones'])
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

  selectPalista(valor) {
    const palista = this.tblPalistas.find( element => element.palista === valor);
    if (this.templateData.titulo === 'Agregar' && !!this.tblInscripciones.find( element => element.dni === palista.dni)) {
      this.miForm.controls.palista.setValue('');
      this.msg.warning(palista.palista + ' Ya está inscrito. Si lo desea modifique su inscripción');
    } else {
      this.miForm.patchValue(palista);
      this.tblDistancias = this.distanciasDeLaCategoria(palista.categoria);
    }
  }

  marcarDistancias(arrayDistancias){
    const options = this.selectDistancia.nativeElement.options;
    for ( let i = 0, len = options.length; i < len; i++ ) {
      if ( arrayDistancias.indexOf( options[i].text ) != -1 ) {
        options[i].selected = true;
      }
    }
  }

  distanciasDeLaCategoria(categoria: string) {
    let todasLasDistancias = this.actRoute.snapshot.data['inscripcionData'][5].distancia;
    return todasLasDistancias.filter( data => data.categoria === categoria);
  }

}
