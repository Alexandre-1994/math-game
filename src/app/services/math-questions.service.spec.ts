import { TestBed } from '@angular/core/testing';

import { MathQuestionsService } from './math-questions.service';

describe('MathQuestionsService', () => {
  let service: MathQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
