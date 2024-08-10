import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewPortStateService {
  private viewPortStateSubject = new BehaviorSubject<string | undefined>(
    undefined,
  );
  viewPortState$ = this.viewPortStateSubject.asObservable();

  constructor() {}

  setViewPortState(screenSize: string | undefined): void {
    this.viewPortStateSubject.next(screenSize);
  }
}
