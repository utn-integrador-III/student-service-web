import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

// Mock del AuthService
class AuthServiceMock {
  getToken() {
    return 'mock-token'; // Devuelve un token de prueba
  }
}

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthService, useClass: AuthServiceMock }, // Usa el mock del AuthService
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if the URL is not excluded', () => {
    httpClient.get('/api/test').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });

  it('should not add Authorization header if the URL is excluded', () => {
    // Excluye URL_LOSTANDFOUND en el interceptor
    httpClient.get(environment.URL_LOSTANDFOUND).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(environment.URL_LOSTANDFOUND);
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
