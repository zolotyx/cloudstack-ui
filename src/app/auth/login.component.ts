import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ConfigService } from '../shared/services/config.service';

export interface LoginData {
  username: string,
  domain: string,
  password: string
}

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('user') public usernameField;
  @ViewChild('pass') public passwordField;

  @Input() public isLoading = false;
  @Output() private onLogin = new EventEmitter<LoginData>();
  public username = '';
  public password = '';
  public domain = '';
  public loading = true;

  public showDomain = false;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    const domainFromConfig = this.configService.get('defaultDomain');
    const domainFromQueryParams = this.route.snapshot.queryParams['domain'];
    this.domain = domainFromQueryParams || domainFromConfig || '';
    this.loading = false;
  }

  public toggleDomain(): void {
    this.showDomain = !this.showDomain;
  }

  public onSubmit(): void {
    if (this.username && this.password) {
      this.onLogin.emit({
        username: this.username,
        domain: this.domain,
        password: this.password
      });
      return;
    }
    if (!this.username) {
      this.setErrors(this.usernameField.control);
    }
    if (!this.password) {
      this.setErrors(this.passwordField.control);
    }
  }

  private setErrors(control: AbstractControl): void {
    control.setErrors({ required: true });
    control.markAsDirty();
  }
}
