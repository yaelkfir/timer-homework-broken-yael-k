import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksRouteComponent } from './tasks-route/tasks-route.component';

const routes: Routes = [
  {
    path: '',
    component: TasksRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRouteRoutingModule { }
