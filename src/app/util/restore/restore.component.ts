import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styles: []
})
export class RestoreComponent implements OnInit {
  file;
  fecha: string;
  hora: string;
  tablas: string[];
  datos: Object;

  constructor(private router: Router, 
              private location: Location,
              private msg: MessageService,
              private crudService: CrudService) {
  }

  ngOnInit() {
  }

  onChange(e) {
    this.file = e.target.files[0];
    let fecha = new Date(this.file.lastModified);
    this.fecha = fecha.toLocaleDateString();
    this.hora = fecha.toLocaleTimeString();

    let reader  = new FileReader();
    reader.onloadend =  () => {
      this.datos = JSON.parse(reader.result as string);
      this.tablas = Object.keys(this.datos)
    }
    reader.readAsText(this.file);
  }

  async onUpload() {
    let numRecordsInDB = 0;
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
    this.msg.ok('Datos restaurados satisfactoriamente');
  }

  goBack() {
    this.location.back();
  }

  verifyTabla(tabla: string) {
    return this.crudService.getAllRecords$(tabla).toPromise();
  }
}
