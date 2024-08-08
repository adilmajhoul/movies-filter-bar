import { Injectable, signal, Signal } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | undefined | null>(undefined);

  constructor() {}
}
