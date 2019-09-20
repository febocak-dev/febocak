import { Component, OnInit, ElementRef, EventEmitter, Input, ViewChild, Output } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CompetenciaI } from '@models/competencia';
import { CrudService } from '@services/crud.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styles: []
})
export class BackupComponent implements OnInit {
  @Input() competencia: CompetenciaI;
  @ViewChild('aDownload', {static: false}) aDownload: ElementRef;
  @Output() emitExportar = new EventEmitter<string>();

  downloadJsonHref;
  preparacionStatus = 0;
  mensaje = 'El proceso de exportar los datos puede tardar varios minutos. Para iniciar pulse en el botón preparar datos. Una vez finalizado el proceso pulse en el botón exportar';
  
  constructor(
    private location: Location,
    private sanitizer: DomSanitizer,
    private crudService: CrudService) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  exportarDatos(){
    this.aDownload.nativeElement.click();
    this.emitExportar.emit('Exportar');
    this.location.back();
  }

  generateDownloadJsonUri() {
    this.mensaje = 'P r e p a r a n d o . . .';
    this.preparacionStatus = 1;
    let jsonData = '{';
    let contador = 0;
    let nomTablas =  ['categorias', 'clubes', 'distancias', 'competencias', 'consola', 'inscripciones', 'palistas', 'users'];
    let arrObs = [];

    nomTablas.forEach( tabla => arrObs.push(this.crudService.getAllRecords$(tabla)) );

    const result$ = merge(...arrObs);
    result$.subscribe({
      next: data => {
        jsonData = jsonData +  '"' + nomTablas[contador] + '":' + JSON.stringify(data);
        contador++;
        if (contador < nomTablas.length) {
          jsonData = jsonData + ',';
        }
      },
      complete: () => {
        jsonData = jsonData + '}';
          this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(jsonData));
          this.mensaje = 'Preparación finalizada';
          this.preparacionStatus = 2;
      }
    });

  }
}
