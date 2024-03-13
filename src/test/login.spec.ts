import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [AuthService, FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should set error message if authentication fails', () => {
      const fakeLoginForm = { username: 'test@test.com', password: 'password' };
      spyOn(authService, 'login').and.returnValue(of(false));
      component.loginForm = formBuilder.group({
        username: ['test@test.com'],
        password: ['password'],
      });

      component.login();

      expect(component.classMessage).toBe('message error');
      expect(component.message).toBe('Error de autenticacion');
    });

    it('should reset message after 2 seconds', waitForAsync(() => {
      const fakeLoginForm = { username: 'test@test.com', password: 'password' };
      spyOn(authService, 'login').and.returnValue(of(true));
      component.loginForm = formBuilder.group({
        username: ['test@test.com'],
        password: ['password'],
      });

      component.login();

      expect(component.classMessage).toBe('');
      expect(component.message).toBe('');

      setTimeout(() => {
        expect(component.classMessage).toBe('');
        expect(component.message).toBe('');
      }, 2000);
    }));
  });
});
