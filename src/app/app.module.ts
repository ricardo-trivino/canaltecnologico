import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Librerías para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicioTecnologicoService } from './servicio-tecnologico.service';

import { AppComponent } from '../app/appcomponent/app.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { TiposIdComponent } from './tipos-id/tipos-id.component';
import { TiposUsComponent } from './tipos-us/tipos-us.component';

//========================================================================
const appRoutes: Routes =
  [
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'Inicio'
    },
    {
      path: 'Inicio',
      component: MenuInicioComponent,
    },
    {
      path: 'Tipo-Id',
      component: TiposIdComponent,
    },
    {
      path: 'Tipo-Us',
      component: TiposUsComponent,
    }
  ]

//========================================================================

@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    TiposIdComponent,
    TiposUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    BrowserModule,
    HttpClientModule  // <- Agregar la clase
  ],
  providers: [ServicioTecnologicoService],
  bootstrap: [AppComponent]
})
export class AppModule { }