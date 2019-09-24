import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { Location } from '@angular/common';
import { ArrayService } from '@services/array.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-importar-palistas',
  templateUrl: './importar-palistas.component.html',
  styles: []
})
export class ImportarPalistasComponent implements OnInit {
  isEnableFileButton = true;
  file;
  fecha: string;
  hora: string;
  
  palistas: any[];
  sharePalistas;

  clubes: any[];
  palistasClub: any[];

  tblResumen = [];

  tablas: string[];

  constructor(
    private router: Router, 
    private location: Location,
    private msg: MessageService,
    private crudService: CrudService,
    private arrayService: ArrayService,
    private shareDataService: ShareDataService) {
  }

  ngOnInit() {
  }

  onChange(e) {
    this.isEnableFileButton = false;
    this.file = e.target.files[0];
    let fecha = new Date(this.file.lastModified);
    this.fecha = fecha.toLocaleDateString();
    this.hora = fecha.toLocaleTimeString();

    let reader  = new FileReader();
    reader.onloadend =  () => {
      let datos = JSON.parse(reader.result as string);
      this.palistas = [...Object.values(datos)];
      
      this.checkAll();
      this.checkEmptyClub();
      this.checkEmptyDNI();
      this.checkEmptyName();
      this.checkEmptyFecha();
      this.checkFecha();
      this.checkRepeatedDNI();
    }
    reader.readAsText(this.file);
  }

  checkAll() {
    const palistasOriginales = [...this.palistas];

    this.sharePalistas = { 'original': [palistasOriginales, 'Archivo original'] };
    const resumen = {
      descrip: 'Número de registros en el archivo original: ' + palistasOriginales.length,
      tipo: 'original'
    }
    this.tblResumen.push(resumen);
  }

  checkEmptyClub() {
    const palistasEmptyClub = this.palistas.filter( el => el.ENTIDAD === '');
    this.palistas = this.palistas.filter( el => el.ENTIDAD !== '');

    this.sharePalistas['emptyClub'] = [palistasEmptyClub, , 'Registros con club en blanco'];
    const resumen = {
      descrip: 'Cantidad de registros con club en blanco: ' + palistasEmptyClub.length,
      tipo: 'emptyClub'
    }
    this.tblResumen.push(resumen);
  }

  checkEmptyDNI() {
    const palistasEmptyDni = this.palistas.filter( el => el['D.N.I.'] === '');

    this.sharePalistas['emptyDni'] = [palistasEmptyDni, 'Registros con DNI en blanco'];
    const resumen = {
      descrip: 'Número de registros con DNI en blanco: ' + palistasEmptyDni.length,
      tipo: 'emptyDni'
    }
    this.tblResumen.push(resumen);
  }

  checkEmptyName() {
    const palistasEmptyName = this.palistas.filter( el => el.APELLIDO === '' || el.NOMBRE === '');

    this.sharePalistas['emptyName'] = [palistasEmptyName, 'Registros con nombre o apellido en blanco'];
    const resumen = {
      descrip: 'Número de registros con Nombre o Apellido en blanco: ' + palistasEmptyName.length,
      tipo: 'emptyName'
    }
    this.tblResumen.push(resumen);
  }

  checkEmptyFecha() {
    const palistasEmptyFecha = this.palistas.filter( el => el['FECHA NAC.'] === '');

    this.sharePalistas['emptyFecha'] = [palistasEmptyFecha, 'Registros con fecha en blanco'];
    const resumen = {
      descrip: 'Número de registros con fecha en blanco: ' + palistasEmptyFecha.length,
      tipo: 'emptyFecha'
    }
    this.tblResumen.push(resumen);
  }

  checkFecha() {
    const palistasValidFecha = this.palistas.filter( 
      el => el['FECHA NAC.'] !== '' && this.validateFecha(el['FECHA NAC.'])
    );

    this.sharePalistas['validFecha'] = [palistasValidFecha, 'Registros con fecha invalida'];
    const resumen = {
      descrip: 'Número de registros con fecha invalida: ' + palistasValidFecha.length,
      tipo: 'validFecha'
    }
    this.tblResumen.push(resumen);
  }

  validateFecha(fecha: string): boolean {
    if (fecha.length > 10) {
      return true;
    }
    if (fecha.length < 10) {
      fecha = '0' + fecha;
    }

    let vfecha = fecha.split('/');

    if ( +vfecha[2] < 1900 || +vfecha[2] > 2015) {
      return true;
    }
    if (+vfecha[1] < 1 || +vfecha[1] > 12) {
      return true;
    }
    if (+vfecha[0] < 1 || +vfecha[0] > 31) {
      return true;
    }
    if ([4, 6, 9, 11].includes(+vfecha[1]) && +vfecha[0] > 30) {
      return true;
    }
    if (+vfecha[1] === 2 && +vfecha[0] > 29) {
      return true;
    }
    return false; 
  }

  checkRepeatedDNI() {
    const palistasConDNI = this.palistas.filter( el => el['D.N.I.'] !== '');
    const palistasAgrupadosPorDni = this.arrayService.groupAndCount(palistasConDNI, ['D.N.I.']);
    const palistasRepeatedDni = palistasAgrupadosPorDni.filter( el => el.cantidad > 1);

    this.sharePalistas['repeatedDni'] = [palistasRepeatedDni, 'Registros con DNI repetido'];
    const resumen = {
      descrip: 'Número de registros con DNI en repetido: ' + palistasRepeatedDni.length,
      tipo: 'repeatedDni'
    }
    this.tblResumen.push(resumen);

  }

  extraerclubes() {
    this.clubes = this.arrayService.groupAndCount(this.palistas, ['ENTIDAD']);
    this.tblResumen.push('Número de clubes : ' + this.clubes.length);
  }

  filterPalistasClub(club: string) {
    this.palistasClub = this.palistas.filter( el => el.ENTIDAD === club);
  }

  showClubs() {
    this.shareDataService.sendData({nombre: 'clubes', value: this.clubes});
    this.shareDataService.sendData({nombre: 'palistas', value: this.palistas});

    this.router.navigate(['importar-palistas/show-clubs']);
  }

  showDNIrepetidos() {
    this.shareDataService.sendData({nombre: 'palistas', value: this.palistas});

    this.router.navigate(['importar-palistas/show-dni-repetidos']);
  }

  showPalistas(tipo: string) {
    this.shareDataService.sendData({ palistas: this.sharePalistas[tipo] });
    this.router.navigate(['importar-palistas/show-palistas/' + tipo]);
  }

  async onUpload() {
    /* let numRecordsInDB = 0;
    for (const tabla of this.tablas.filter(el => el !== 'users')) {
      let verifyData = await this.verifyTabla(tabla);
      let numRegistros = verifyData ? verifyData.length : 0; 
      numRecordsInDB += numRegistros;
      console.log('tabla:', tabla, 'registros', numRegistros);
      let datos = JSON.stringify(this.datos[tabla])
    }
    console.log('numRecordsInDB', numRecordsInDB)

    if (numRecordsInDB === 0) {
      this.tablas.forEach( async tabla => {
        let datos = [...this.datos[tabla]];
        console.log(tabla);
        datos.forEach( record => {
          this.crudService.setRecord$(tabla, record);
        });
      }); 
    }
    
    this.router.navigate(['home']);
    this.msg.ok('Datos restaurados satisfactoriamente'); */
  }

  goBack() {
    this.location.back();
  }

  verifyTabla(tabla: string) {
    return this.crudService.getAllRecords$(tabla).toPromise();
  }
}
