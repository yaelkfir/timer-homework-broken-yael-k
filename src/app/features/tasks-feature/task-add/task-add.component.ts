import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { TaskStoreService } from '../../../core/services/task-store.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: TaskStoreService) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [
        null,
        [Validators.compose([Validators.required, Validators.minLength(2)])],
        [this.validateNameExists.bind(this)],
      ],
    });
  }
  submitHandler(text: string) {
    this.service.addTask(text);
    this.resetForm();
  }
  private resetForm() {
    this.form.reset();
  }

  validateNameExists(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.service
      .nameExists(control.value)
      .pipe(map((exists: boolean) => (exists ? { nameTaken: true } : null)));
  }
}
