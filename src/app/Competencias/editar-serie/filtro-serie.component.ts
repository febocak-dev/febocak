import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoriaI } from 'src/app/models/categoria';
import { DistanciaI, CompetenciaI } from 'src/app/models/competencia';
import { CrudService } from '@services/crud.service';
import { ArrayService } from '@services/array.service';

@Component ({
  selector: 'app-filtro-serie',
  templateUrl: './filtro-serie.component.html',
  styles: []
})
export class FiltroSerieComponent implements OnInit {
  tblCategorias: CategoriaI[];
  tblDistancias: DistanciaI[];
  @Output() emitFiltrar = new EventEmitter<{genero: string, categoria: string, distancia: string }>();
  @Output() emitLimpiar = new EventEmitter();
  @Output() emitGuardar = new EventEmitter();
  @Output() emitSalir = new EventEmitter();

  miForm: FormGroup;

  constructor(private fb: FormBuilder,
    private crudService: CrudService,
    private arrayService: ArrayService) {

}

  ngOnInit() {
    this.crudService.getAllRecords$('categorias').subscribe( 
      data => this.tblCategorias = this.arrayService.sort(data, ['desde'])
    );
    this.crudService.getAllRecords$<CompetenciaI>('competencias').subscribe( data => {
      // TODO tomar distancias de la tabla consola.
      // Esto implica guardar las distancias en la tabla consola al exportar los datos
      // Esto implica no exportar las tablas competencias y distancias 
      this.tblDistancias = this.arrayService.groupAndFlat(data[2].distancia, ['embarcacion','distancia']);
      console.log('TCL: FiltroSerieComponent -> ngOnInit -> this.tblDistancias', this.tblDistancias)
      
    });

    this.buildForm();
  }

  buildForm() {
    this.miForm = this.fb.group({
      genero: [''],
      categoria: [''],
      club: [''],
      distancia: ['']

    });
  }

  get genero() {
    return this.miForm.get('genero');
  }
  get categoria() {
    return this.miForm.get('categoria');
  }
  get distancia() {
    return this.miForm.get('distancia');
  }

  guardar() {
    this.emitGuardar.emit();
    //this.emitFiltrar.emit(this.miForm.value);
  }

  limpiar(){
    this.miForm.controls.genero.setValue('');
    this.miForm.controls.categoria.setValue('');
    this.miForm.controls.distancia.setValue('');
    this.emitLimpiar.emit();
  }

  onSubmit() {
       //TODO revisar en el arreglo de distancias no hay "m" al final pero en las inscripciones si
    this.emitFiltrar.emit(
      {
        genero: this.genero.value,
        categoria: this.categoria.value,
        distancia: this.distancia.value     //+ ' m'
      }
    );
  }

  salir() {
    this.emitSalir.emit();
    //this.emitFiltrar.emit(this.miForm.value);
  }
}
