import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskAddComponent } from './task-add.component';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TaskStoreService } from '../../../core/services/task-store.service';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;
  beforeEach(() => {
    const logicServiceStub = {
      addTask: () => ({}),
      nameExists: () => of({}),
    };
    TestBed.configureTestingModule({
      declarations: [TaskAddComponent],
      providers: [{ provide: TaskStoreService, useValue: logicServiceStub }],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(TaskAddComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('validateNameExists', () => {
    it('makes expected calls', () => {
      const logicServiceStub: TaskStoreService =
        fixture.debugElement.injector.get(TaskStoreService);
      jest.spyOn(logicServiceStub, 'nameExists').mockReturnValue(of(true));

      const given = { value: 'hello' } as any;
      component.validateNameExists(given);
      expect(logicServiceStub.nameExists).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder =
        fixture.debugElement.injector.get(FormBuilder);
      jest.spyOn(formBuilderStub, 'group');
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('submitHandler', () => {
    it('makes expected calls', () => {
      const logicServiceStub: TaskStoreService =
        fixture.debugElement.injector.get(TaskStoreService);
      const spyAddTask = jest.spyOn(logicServiceStub, 'addTask');
      fixture.detectChanges();
      component.submitHandler('someText');
      expect(spyAddTask).toHaveBeenCalled();
    });
  });
});
