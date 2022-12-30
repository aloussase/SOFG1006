import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { InsultRepository } from '../repositories/insult-repository';

@Component({
  selector: 'app-crear-insulto',
  templateUrl: './crear-insulto.component.html',
  styleUrls: ['./crear-insulto.component.scss'],
})
export class CrearInsultoComponent {
  newInsult = new FormControl('');
  errorCrearInsultoVacio = false;
  insultoAnadido = false;

  constructor(private insultRepository: InsultRepository) {}

  onCreateInsult() {
    if (this.newInsult.value === null || this.newInsult.value === '') {
      this.errorCrearInsultoVacio = true;
      return;
    }

    this.insultRepository
      .save({
        insult: this.newInsult.value,
        shown: '0',
        created: Date().toString(),
        number: '69',
        active: '1',
        createdBy: 'anon',
        language: 'spanish',
        comment: '',
      })
      .subscribe((anadido) => {
        this.newInsult.setValue('');
        this.insultoAnadido = anadido;
      });
  }
}
