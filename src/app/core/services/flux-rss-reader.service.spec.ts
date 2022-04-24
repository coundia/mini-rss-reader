import {TestBed} from '@angular/core/testing';

import {FluxRssReaderService} from './flux-rss-reader.service';

describe('FluxRssReaderService', () => {
  let service: FluxRssReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluxRssReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //tdd
});
