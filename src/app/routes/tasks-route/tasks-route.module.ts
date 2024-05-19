import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRouteRoutingModule } from './tasks-route-routing.module';
import { TasksRouteComponent } from './tasks-route/tasks-route.component';
import { TasksFeatureModule } from 'src/app/features/tasks-feature/tasks-feature.module';


@NgModule({
  declarations: [
    TasksRouteComponent
  ],
  imports: [
    CommonModule,
    TasksRouteRoutingModule,
    TasksFeatureModule
  ]
})
export class TasksRouteModule { }
