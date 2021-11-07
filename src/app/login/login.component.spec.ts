import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

const fakeSpinner = {
  login: () => of()
};
const routerSpy = { navigateByUrl: jasmine.createSpy('navigate') };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent }
      ]), ToastrModule.forRoot()],
      declarations: [LoginComponent],
      providers: [{ provide: LoginService, useValue: fakeSpinner }, { provide: RouterTestingModule, useValue: routerSpy }, ToastrService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
