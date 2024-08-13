import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBS_yxrXeLaPleI__MPLQqBuxNti9M2B0Q",
  authDomain: "prueba-ee79a.firebaseapp.com",
  projectId: "prueba-ee79a",
  storageBucket: "prueba-ee79a.appspot.com",
  messagingSenderId: "774925588587",
  appId: "1:774925588587:web:d246e5295ca59b8d75b92e"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore()
  ]
};
