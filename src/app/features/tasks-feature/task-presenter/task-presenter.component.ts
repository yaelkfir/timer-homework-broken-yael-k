import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TaskModel } from '../../../core/models/task-model';
import { Observable } from 'rxjs';
import { buttonText } from 'src/app/core/models/button-text';

@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPresenterComponent implements TaskModel {
  
  @Input() id: number;
  @Input() name: string;
  @Input() timer: Observable<number>;
  @Input() buttonText: buttonText;

  @Output() clicked = new EventEmitter<number>();

  public click() {
    this.clicked.emit(this.id);
  }
}
