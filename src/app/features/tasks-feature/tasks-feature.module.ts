import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskPresenterComponent } from './task-presenter/task-presenter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { PipesModule } from '../../core/pipes/pipes.module';
import { TaskAddComponent } from './task-add/task-add.component';

const compoents = [
  TaskContainerComponent,
  TaskPresenterComponent,
  TaskAddComponent,
]
@NgModule({
  declarations: compoents,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: compoents
})
export class TasksFeatureModule { }
