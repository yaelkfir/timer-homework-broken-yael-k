import { BehaviorSubject } from 'rxjs';
import { TaskModel } from './task-model';
export class TasksSubject extends BehaviorSubject<TaskModel[]> {
  constructor(state: TaskModel[]) {
    super(state || []);
  }

  addTask(task: TaskModel): void {
    const tasks = this.getValue();
    tasks.push(task);
    this.next(tasks);
  }

  removeTask(task: TaskModel): void {
    const tasks = this.getValue();
    const index = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.next(tasks);
    }
  }

  updateTask(task: TaskModel): void {
    const tasks = this.getValue();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.next(tasks);
    }
  }

  setTasks(tasks: TaskModel[]) {
    this.next(tasks);
  }
}
