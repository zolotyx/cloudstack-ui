import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackendResource } from '../shared/decorators';
import { BaseBackendService } from '../shared/services/base-backend.service';

import { Event } from './event.model';
import { ErrorService } from '../shared/services/error.service';
import { CacheService } from '../shared/services/cache.service';

@Injectable()
@BackendResource({
  entity: 'Event',
  entityModel: Event
})
export class EventService extends BaseBackendService<Event> {
  constructor(public errorService: ErrorService,
              public http: Http,
              public cacheService: CacheService) {
    super(cacheService, errorService, http);
  }
}
