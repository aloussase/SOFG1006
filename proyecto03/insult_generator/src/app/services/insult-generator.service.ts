import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';

import { EvilInsult } from '../interfaces/evil-insult';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsultGeneratorService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get a random insult.
   */
  getRandomInsult(): Observable<EvilInsult> {
    return this.http.get(this.API_URL).pipe(
      timeout(5000),
      map((response: any) => response.data as EvilInsult)
    );
  }
}
