import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BackendResource } from '../decorators';
import { User } from '../models/user.model';
import { BaseBackendService } from './base-backend.service';
import { CacheService } from './cache.service';
import { ErrorService } from './error.service';


@Injectable()
@BackendResource({
  entity: 'User',
  entityModel: User
})
export class UserService extends BaseBackendService<User> {
  constructor(public cacheService: CacheService,
              public errorService: ErrorService,
              public http: Http) {
    super(cacheService, errorService, http);
  }

  public updatePassword(id: string, password: string): Observable<any> {
    return this.postRequest('update', { id, password });
  }

  public registerKeys(id: string): Observable<any> {
    return this.sendCommand('register;Keys', { id }).map(res => res.userkeys);
  }
}
