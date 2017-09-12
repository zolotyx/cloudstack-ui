import { DISABLE_NATIVE_VALIDITY_CHECKING, MdlModule } from '@angular-mdl/core';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlSelectModule } from '@angular-mdl/select';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MdCheckboxModule,
  MdDialog,
  MdIconModule,
  MdTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';
import { DialogModule } from './dialog/dialog-service/dialog.module';
import { EventsModule } from './events/events.module';
import { AppSidebarComponent } from './navigation/app-sidebar.component';
import { SecurityGroupModule } from './security-group/sg.module';
import { ServiceOfferingModule } from './service-offering/service-offering.module';
import { SettingsModule } from './settings/settings.module';
import { ServiceLocator } from './shared/services/service-locator';
import { SharedModule } from './shared/shared.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { SpareDriveModule } from './spare-drive';
import { SshKeysModule } from './ssh-keys/ssh-keys.module';
import { TemplateModule } from './template';
import { VmModule } from './vm';
import { BaseHttpInterceptor } from './shared/services/base-http-interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './auth/redux/reducers/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/redux/effects/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginContainerComponent } from './auth/containers/login.container';
import { RouterEffects } from './auth/redux/effects/router.effects';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    SnapshotModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot(reducers),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    EffectsModule.forRoot([
      AuthEffects,
      RouterEffects
    ]),
    EventsModule,
    DragulaModule,
    MdIconModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    DialogModule,
    SecurityGroupModule,
    ServiceOfferingModule,
    SettingsModule,
    SpareDriveModule,
    SshKeysModule,
    TemplateModule,
    VmModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreRouterConnectingModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    AppSidebarComponent,
    LoginComponent,
    LoginContainerComponent,
    LogoutComponent
  ],
  providers: [
    MdDialog,
    { provide: DISABLE_NATIVE_VALIDITY_CHECKING, useValue: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
