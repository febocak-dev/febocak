import { Component, OnInit } from '@angular/core';
import { CrudService } from '@services/crud.service';
import { DistanciaI } from '@models/distancia';
import { CompetenciaI } from '@models/competencia';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Component({
  selector: 'app-copiar-distancias',
  templateUrl: './copiar-distancias.component.html',
  styles: []
})
export class CopiarDistanciasComponent implements OnInit {
  distancias: DistanciaI[];

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.getRecord$<CompetenciaI>('competencias','lJBIk7KClZmifrIrSysT').subscribe(
      data => this.distancias = data.distancia
    )
  }

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.crudService.getRecord$<TipoDeCompetenciaI>('tipos-de-competencias','pEyNIgxTDfONdV1Sq1xB').subscribe(
      data => {
        const record = { ...data, distancia: this.distancias}
        this.crudService.updateRecord$('tipos-de-competencias','pEyNIgxTDfONdV1Sq1xB', record).subscribe(
          _ => console.log('Proceso realizado satisfactoriamente')

        )
      }
    )
  }
}
