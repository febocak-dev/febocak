import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MessageI {
  class: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message$ = new Subject<MessageI | null>();

  clearMessages() {
    this.message$.next(null);
  }

  public ok(message: string) {
    this.message$.next({ class: 'alert-success', message });
  }

  public info(message: string) {
    this.message$.next({ class: 'alert-info', message });
  }

  public warning(message: string) {
    this.message$.next({ class: 'alert-warning', message });
  }

  public error(message: string) {
    this.message$.next({ class: 'alert-danger', message });
  }
}