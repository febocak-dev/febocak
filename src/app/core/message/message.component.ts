import { Component, OnInit } from '@angular/core';
import { MessageI, MessageService } from './message.service';
import { merge, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: []
})
export class MessageComponent implements OnInit {

  message$: Observable<MessageI | boolean>;
  close$ = new Subject<boolean>();

  constructor(private msgService: MessageService) {
  }

  ngOnInit() {
    this.message$ = merge(this.msgService.message$, this.close$);
  }

  closeAlert(): void {
    this.close$.next();
  }
}
