import { EvilInsult } from '../interfaces/evil-insult';

import { Observable, of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InsultRepository {
  private insults: Map<string, EvilInsult> = new Map();

  /**
   * Save a new insult in the repository.
   * @param insult
   */
  save(insult: EvilInsult): Observable<boolean> {
    const couldInsert = !this.insults.has(insult.number);
    this.insults.set(insult.number, insult);
    return of(couldInsert);
  }

  /**
   * Get all insults from the repository.
   */
  findAll(): Observable<EvilInsult[]> {
    let insults = [];
    for (const insult of this.insults.values()) {
      insults.push(insult);
    }
    return insults.length === 0 ? EMPTY : of(insults);
  }

  /**
   * Delete the given insult from the repository.
   * @param id
   */
  delete(id: string): Observable<boolean> {
    return of(this.insults.delete(id));
  }
}
