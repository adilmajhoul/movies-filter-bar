import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Breakpoint } from '../types/breakpoint';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  breakPointState = signal<string | undefined | null>(undefined);
}
