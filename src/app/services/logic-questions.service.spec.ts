import { TestBed } from '@angular/core/testing';

import { LogicQuestionsService } from './logic-questions.service';

describe('LogicQuestionsService', () => {
  let service: LogicQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
