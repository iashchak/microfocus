import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../shared/user.interface';
import { Message, MessageId } from '../shared/notifications.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @Input()
  public title = 'Sample Title';

  @Input()
  public showToHomeButton = false;

  @Input()
  public showUserInfo = true;

  @Input()
  public currentUser: User | undefined = undefined;

  @Input()
  messages: Message[] = [];

  @Output()
  public logout: EventEmitter<null> = new EventEmitter();

  @Output()
  public removeMessage: EventEmitter<MessageId> = new EventEmitter<MessageId>();

  @Output()
  public removeAllMessages: EventEmitter<null> = new EventEmitter();

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
