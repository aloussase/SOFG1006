import { TestBed } from '@angular/core/testing';

import { InsultGeneratorService } from './insult-generator.service';

describe('InsultGeneratorService', () => {
  let service: InsultGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsultGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
