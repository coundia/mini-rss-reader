import { TestBed } from '@angular/core/testing';

import { FluxRssReaderService } from './flux-rss-reader.service';

describe('FluxRssReaderService', () => {
  let service: FluxRssReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluxRssReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //TDD getItem
  it('#getItem doit retourner des items',
    (done: DoneFn) => {
      service.getItems().subscribe(value => {
        expect(value.length).toBeGreaterThan(1)
        done();
      });
    });
});
