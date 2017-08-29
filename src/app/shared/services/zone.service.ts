import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BackendResource } from '../decorators/backend-resource.decorator';
import { Zone } from '../models/zone.model';
import { BaseBackendCachedService } from './base-backend-cached.service';
import { ErrorService } from './error.service';
import { CacheService } from './cache.service';


@Injectable()
@BackendResource({
  entity: 'Zone',
  entityModel: Zone
})
export class ZoneService extends BaseBackendCachedService<Zone> {
  // a basic zone is a zone that doesn't support security groups
  constructor(public errorService: ErrorService,
              public http: Http,
              public cacheService: CacheService) {
    super(cacheService, errorService, http);
  }
  public areAllZonesBasic(): Observable<boolean> {
    return this.getList()
      .map(zoneList => zoneList.every(zone => zone.networkTypeIsBasic));
  }
}
