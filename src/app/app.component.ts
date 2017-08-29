import { MdlLayoutComponent } from '@angular-mdl/core';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import '../style/app.scss';
import { AsyncJobService } from './shared/services/async-job.service';
import { AuthService } from './shared/services/auth.service';
import { CacheService } from './shared/services/cache.service';
import { ErrorService } from './shared/services/error.service';
import { LanguageService } from './shared/services/language.service';
import { LayoutService } from './shared/services/layout.service';
import { MemoryStorageService } from './shared/services/memory-storage.service';
import { NotificationService } from './shared/services/notification.service';
import { RouterUtilsService } from './shared/services/router-utils.service';
import { SessionStorageService } from './shared/services/session-storage.service';
import { StyleService } from './shared/services/style.service';
import { ZoneService } from './shared/services/zone.service';
import { Store } from '@ngrx/store';
import { getName, isAuthenticated } from './auth/redux/selectors/auth.selectors';
import { TAppState } from './auth/redux/reducers/index';


@Component({
  selector: 'cs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MdlLayoutComponent) public layoutComponent: MdlLayoutComponent;
  public loggedIn: boolean;
  public title: string;
  public disableSecurityGroups = false;

  readonly loggedIn$ = this.store.select(isAuthenticated);
  readonly username$ = this.store.select(getName);

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<TAppState>,
    private error: ErrorService,
    private languageService: LanguageService,
    private asyncJobService: AsyncJobService,
    private cacheService: CacheService,
    private sessionStorage: SessionStorageService,
    private memoryStorage: MemoryStorageService,
    private layoutService: LayoutService,
    private notification: NotificationService,
    private styleService: StyleService,
    private routerUtilsService: RouterUtilsService,
    private zoneService: ZoneService,
    private zone: NgZone
  ) {
    this.title = this.auth.name;
  }

  public ngOnInit(): void {
    this.loadSettings();

    this.error.subscribe(e => this.handleError(e));
    this.auth.loggedIn.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      this.updateAccount(this.loggedIn);
    // this.loggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.auth.startInactivityCounter();
        this.loadSettings();
        this.zoneService
          .areAllZonesBasic()
          .subscribe(basic => (this.disableSecurityGroups = basic));
      } else {
        this.auth.clearInactivityTimer();
      }
      this.asyncJobService.completeAllJobs();
      this.cacheService.invalidateAll();
      this.storageReset();
    });

    this.captureScrollEvents();
  }

  private updateAccount(loggedIn: boolean): void {
    if (loggedIn) {
      this.title = this.auth.name;
    }
  }

  private handleError(e: any): void {
    if (e instanceof Response) {
      switch (e.status) {
        case 401:
          this.notification.message('AUTH.NOT_LOGGED_IN');
          const route = this.routerUtilsService.getRouteWithoutQueryParams();
          if (route !== '/login' && route !== '/logout') {
            this.router.navigate(
              ['/logout'],
              this.routerUtilsService.getRedirectionQueryParams()
            );
          }
          break;
      }
    }
  }

  public get isDrawerOpen(): boolean {
    return this.layoutService.drawerOpen;
  }

  private loadSettings(): void {
    this.languageService.applyLanguage();
    this.styleService.loadPalette();
  }

  private captureScrollEvents(): void {
    const useCapture = true;
    this.zone.runOutsideAngular(() => {
      document
        .querySelector('.dialog-container')
        .addEventListener('scroll', e => e.stopPropagation(), useCapture);
    });
  }

  private storageReset() {
    this.sessionStorage.reset();
    this.memoryStorage.reset();
  }
}
