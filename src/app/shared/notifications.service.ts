import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

export type MessageId = symbol;

export interface Message {
  title: string;
  description: string;
  typeOfMessage: 'info' | 'success' | 'danger';
  id?: MessageId;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly messages$: BehaviorSubject<Message[]> = new BehaviorSubject(
    []
  );

  addMessage(title: string, description: string, typeOfMessage): void {
    const newMessage: Message = {
      title,
      description,
      typeOfMessage,
      id: Symbol('id'),
    };
    this.messages$
      .pipe(
        take(1),
        map((messages: Message[]) => messages.concat(newMessage)),
        tap((messages: Message[]) => this.messages$.next(messages))
      )
      .subscribe();
  }

  removeMessage(idToRemove: MessageId): void {
    this.messages$
      .pipe(
        take(1),
        map((messages: Message[]) =>
          messages.filter(({ id }) => id !== idToRemove)
        ),
        tap((messages: Message[]) => this.messages$.next(messages))
      )
      .subscribe();
  }

  removeAll(): void {
    this.messages$.next([]);
  }

  public getMessages(): Observable<Required<Message[]>> {
    return this.messages$.asObservable();
  }
}
