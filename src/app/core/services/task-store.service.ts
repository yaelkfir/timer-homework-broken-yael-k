import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task-model';
import { Observable, combineLatest, iif, of } from 'rxjs';
import { TaskFactoryService } from './task-factory.service';
import { map, mergeMap } from 'rxjs/operators';
import { TasksSubject } from '../models/tasks-subject';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  readonly initialState: TaskModel[] = [];
  private state: TaskModel[] = [...this.initialState];
  private tasksSubject$ = new TasksSubject(this.state);

  constructor(private taskFactoryService: TaskFactoryService) {}

  public get tasks$(): Observable<TaskModel[]> {
    return this.tasksSubject$.asObservable();
  }

  public addTask(tskName: string) {
    const newTask = this.taskFactoryService.createTask(tskName);
    this.tasksSubject$.addTask(newTask);
    this.state = this.tasksSubject$.getValue();
  }

  public updateTask(id: number): void {
    const index = this.state.findIndex((tsk) => tsk.id === id);
    const nextTasks = this.toggleAllButtonTexts(this.state, index);
    this.tasksSubject$.setTasks(nextTasks);
    this.state = this.tasksSubject$.getValue();
  }

  public get totalTime$(): Observable<number> {
    return this.tasks$.pipe(
      map((tasks) => tasks.map((task) => task.timer)),
      mergeMap((taskTimers) =>
        iif(() => !taskTimers?.length, of([]), combineLatest(taskTimers))
      ),
      map(
        (taskTimers) => taskTimers.reduce((acc, timer) => acc + timer, 0) || 0
      )
    );
  }

  public nameExists(value: string): Observable<boolean> {
    return of(
      this.state.find((x) => x.name.toUpperCase() === value.toUpperCase()) !==
        undefined
    );
  }

  private toggleAllButtonTexts(
    tasks: TaskModel[],
    selectedId: number
  ): TaskModel[] {
    return tasks.reduce((acc, task) => {
      task.id !== selectedId
        ? this.inactivateButtons(task)
        : this.toggleText(task);
      acc.push(task);
      return acc;
    }, [] as TaskModel[]);
  }
  private inactivateButtons(tsk: TaskModel): void {
    if (tsk.buttonText === 'pause') {
      this.setPlay(tsk);
    }
  }

  private toggleText(tsk: TaskModel): void {
    if (tsk.buttonText === 'pause') {
      this.setPlay(tsk);
    } else {
      this.setPause(tsk);
    }
  }
  private setPlay(tsk: TaskModel) {
    tsk.buttonText = 'play_arrow';
    this.taskFactoryService.pause(tsk.id);
  }

  private setPause(tsk: TaskModel) {
    tsk.buttonText = 'pause';
    this.taskFactoryService.play(tsk.id);
  }
}
