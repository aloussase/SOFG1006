import {Component} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";

import {InsultGeneratorService} from "../services/insult-generator.service";
import {EvilInsult} from "../interfaces/evil-insult";
import {InsultRepository} from "../repositories/insult-repository";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  generatedInsult?: EvilInsult;
  errorGeneratingInsult = false;
  insultCopiedToClipboard = false;

  constructor(
    private insultService: InsultGeneratorService,
    private insultRepository: InsultRepository,
    private clipboard: Clipboard,
  ) {
  }

  /**
   * Generate a new insult.
   */
  onGenerateInsult() {
    this.insultService.getRandomInsult().subscribe(
      evilInsult => this.generatedInsult = evilInsult,
      _ => this.errorGeneratingInsult = true
    )
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
      // TODO: Show a message that the insult was starred.
      this.insultRepository.save(this.generatedInsult).subscribe()
    }
  }

}
