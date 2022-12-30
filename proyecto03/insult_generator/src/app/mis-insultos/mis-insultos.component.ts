import { Component } from '@angular/core';
import { InsultRepository } from '../repositories/insult-repository';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-mis-insultos',
  templateUrl: './mis-insultos.component.html',
  styleUrls: ['./mis-insultos.component.scss'],
})
export class MisInsultosComponent {
  constructor(
    public insultRepository: InsultRepository,
    private clipboard: Clipboard
  ) {}

  onCopyToClipboard(insult: string) {
    // TODO: Notify the user the insult has been copied.
    this.clipboard.copy(insult);
  }

  onDeleteInsult(insultId: string) {
    this.insultRepository.delete(insultId).subscribe();
  }
}
