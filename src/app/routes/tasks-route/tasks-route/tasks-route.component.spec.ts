import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRouteComponent } from './tasks-route.component';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksFeatureModule } from '../../../features/tasks-feature/tasks-feature.module';
const routes: Routes = [
  {
    path: '',
    component: TasksRouteComponent,
  },
];
describe('TasksRouteComponent', () => {
  let component: TasksRouteComponent;
  let fixture: ComponentFixture<TasksRouteComponent>;

  beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [TasksRouteComponent],
        imports: [RouterTestingModule.withRoutes(routes), BrowserAnimationsModule, TasksFeatureModule]
        }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
