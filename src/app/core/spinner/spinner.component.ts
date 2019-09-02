import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() loading$: Observable<boolean>;
  loading = false;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.loading$.subscribe( data => this.loading = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
