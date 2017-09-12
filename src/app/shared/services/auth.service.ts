import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'app/shared/services/cache.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BackendResource } from '../decorators';
import { BaseModelStub } from '../models';
import { AccountType } from '../models/account.model';
import { User } from '../models/user.model';
import { AsyncJobService } from './async-job.service';
import { BaseBackendService } from './base-backend.service';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { Utils } from './utils.service';

@Injectable()
@BackendResource({
  entity: '',
  entityModel: BaseModelStub
})
export class AuthService extends BaseBackendService<BaseModelStub> {
  private _user: User | null;

  constructor(
    protected asyncJobService: AsyncJobService,
    protected storage: LocalStorageService,
    public cacheService: CacheService,
    public errorService: ErrorService,
    public http: HttpClient
  ) {
    super(cacheService, errorService, http);

    try {
      const userRaw = this.storage.read('user');
      const user = Utils.parseJsonString(userRaw);
      this._user = new User(user);
    } catch (e) {
    }
  }

  public get user(): User | null {
    return this._user;
  }

  public login(
    username: string,
    password: string,
    domain?: string
  ): Observable<void> {
    return this.postRequest('login', { username, password, domain })
      .map(res => this.getResponse(res))
      .do(res => this.setLoggedIn(res))
      .catch(error => this.handleCommandError(error));
  }

  public logout(): Observable<void> {
    const obs = new Subject<void>();
    this.postRequest('logout')
      .do(() => this.setLoggedOut())
      .catch(error => {
        this.errorService.send(error);
        return Observable.throw('Unable to log out.');
      })
      .subscribe(() => obs.next());
    return obs;
  }

  public isAdmin(): boolean {
    return !!this.user && this.user.type !== AccountType.User;
  }

  private setLoggedIn(loginRes): void {
    this._user = new User(loginRes);
    this.storage.write('user', JSON.stringify(this._user.serialize()));
  }

  private setLoggedOut(): void {
    this._user = null;
    this.storage.remove('user');
  }
}
