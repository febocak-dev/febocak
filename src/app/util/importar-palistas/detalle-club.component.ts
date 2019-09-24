import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-club',
  templateUrl: './detalle-club.component.html',
  styles: []
})
export class DetalleClubComponent implements OnInit {
  palistas;

  constructor( 
    private shareDataService: ShareDataService,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {
    const entidad = this.actRoute.snapshot.paramMap.get('entidad');
    console.log('TCL: DetalleClubComponent -> ngOnInit -> entidad', entidad)
    this.palistas = this.shareDataService.getData('palistas');
    
    this.palistas = this.palistas.filter(el => el.ENTIDAD === entidad);
    console.log('TCL: DetalleClubComponent -> ngOnInit -> this.palistas', this.palistas)
  }

}
