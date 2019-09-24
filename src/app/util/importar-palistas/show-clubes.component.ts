import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-show-clubes',
  templateUrl: './show-clubes.component.html',
  styles: []
})
export class ShowClubesComponent implements OnInit {
  clubes;
  constructor( private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.clubes = this.shareDataService.getData('clubes');
    
  }

}
