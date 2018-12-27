import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas 
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';


@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
    RegisterComponent,
    

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
