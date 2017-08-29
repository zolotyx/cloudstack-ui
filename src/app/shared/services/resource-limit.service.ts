import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseBackendCachedService } from './base-backend-cached.service';
import { BackendResource } from '../decorators/backend-resource.decorator';
import { ResourceLimit } from '../models/resource-limit.model';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './error.service';
import { CacheService } from './cache.service';


@Injectable()
@BackendResource({
  entity: 'ResourceLimit',
  entityModel: ResourceLimit
})
export class ResourceLimitService extends BaseBackendCachedService<ResourceLimit> {
  constructor(public errorService: ErrorService,
              public http: Http,
              public cacheService: CacheService) {
    super(cacheService, errorService, http);
  }

  public getList(params?: {}): Observable<Array<ResourceLimit>> {
    return super.getList(params)
      .map(result => result.sort((a, b) => a.resourceType - b.resourceType));
  }
}
