import { Injectable, NgZone } from '@angular/core';
import { Observable, timer, BehaviorSubject } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerManagerService {
  readonly initialValue = 0;
  private timers: Map<number, BehaviorSubject<number>> = new Map();
  private runningTimers = new Set<number>();
  
  constructor(private ngZone: NgZone) {
    this.runTimers();
  }


  getTimer(id: number): Observable<number> {
    const newTimer = this.createTimer();
    this.timers.set(id, newTimer);
    return newTimer.asObservable();
  }
  private createTimer() {
    return new BehaviorSubject<number>(this.initialValue);
  }
  public playTimer(id: number): void {
    if (!this.timers.has(id)) {
      return;
    }
    this.runningTimers.add(id);
  }

  public pauseTimer(id: number): void {
    if (!this.runningTimers.has(id)) {
      return;
    }
    this.runningTimers.delete(id);
    
  }

  private runTimers(): void {
    timer(0, 1000)
      .pipe(
        filter(() => this.runningTimers.size > 0),
        tap(() => this.ngZone.run(() => {
          this.runningTimers.forEach((timerId) => { 
            const timer$ = this.timers.get(timerId);
            if(timer$) {
              timer$.next(timer$.value + 1);
            }
           })    
          })
        )
      )
      .subscribe();
  }
}
