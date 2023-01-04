import { Clipboard } from '@angular/cdk/clipboard';
import { Observable } from 'rxjs';
import { isEmpty, map } from 'rxjs/operators';

import { Component } from '@angular/core';
import { InsultRepository } from '../repositories/insult-repository';

@Component({
  selector: 'app-mis-insultos',
  templateUrl: './mis-insultos.component.html',
  styleUrls: ['./mis-insultos.component.scss'],
})
export class MisInsultosComponent {
  insultCopiedToClipboard = false;

  noInsults$: Observable<boolean>;

  constructor(
    public insultRepository: InsultRepository,
    private clipboard: Clipboard
  ) {
    this.noInsults$ = this.insultRepository.findAll().pipe(isEmpty());
  }

  onCopyToClipboard(insult: string) {
    this.clipboard.copy(insult);
    this.insultCopiedToClipboard = true;
  }

  onDeleteInsult(insultId: string) {
    this.insultRepository.delete(insultId).subscribe();
  }
}
