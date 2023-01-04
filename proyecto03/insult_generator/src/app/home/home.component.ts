import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { InsultGeneratorService } from '../services/insult-generator.service';
import { EvilInsult } from '../interfaces/evil-insult';
import { InsultRepository } from '../repositories/insult-repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  generatedInsult?: EvilInsult;

  // For alerts
  errorGeneratingInsult = false;
  insultCopiedToClipboard = false;
  insultStarred = false;

  constructor(
    private insultService: InsultGeneratorService,
    private insultRepository: InsultRepository,
    private clipboard: Clipboard
  ) {}

  /**
   * Generate a new insult.
   */
  onGenerateInsult() {
    this.insultService.getRandomInsult().subscribe(
      (evilInsult) => (this.generatedInsult = evilInsult),
      (e) => {
        console.log(e);
        this.errorGeneratingInsult = true;
      }
    );
  }

  /**
   * Copy the generated insult to the clipboard.
   */
  async onCopyToClipboard() {
    if (this.generatedInsult) {
      this.clipboard.copy(this.generatedInsult.insult);
      this.insultCopiedToClipboard = true;
    }
  }

  onStartInsult() {
    if (this.generatedInsult) {
      this.insultRepository
        .save(this.generatedInsult)
        .subscribe(() => (this.insultStarred = true));
    }
  }
}
