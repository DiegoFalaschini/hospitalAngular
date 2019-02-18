import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas 
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { SubirArchivoService } from './services/subir-archivo/subir-archivo.service';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';




@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		PagesComponent
	],

	imports: [
		BrowserModule,
		APP_ROUTES,
		// PagesModule,
		FormsModule,
		ServiceModule,
		ReactiveFormsModule,
		SharedModule
	],

	providers: [
		SubirArchivoService
	],

	bootstrap: [AppComponent],
	
})
export class AppModule { }
