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
import { TiposReComponent } from './tipos-re/tipos-re.component';
import { TiposVeComponent } from './tipos-ve/tipos-ve.component';
import { MarcasVeComponent } from './marcas-ve/marcas-ve.component';
import { FormasPaComponent } from './formas-pa/formas-pa.component';
import { PersonasComponent } from './personas/personas.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { RepuestosComponent } from './repuestos/repuestos.component';

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
    },
    {
      path: 'Tipo-Re',
      component: TiposReComponent,
    },
    {
      path: 'Tipo-Ve',
      component: TiposVeComponent,
    },
    {
      path: 'Marca-Ve',
      component: MarcasVeComponent,
    },
    {
      path: 'Forma-Pa',
      component: FormasPaComponent,
    },
    {
      path: 'Persona',
      component: PersonasComponent,
    },
    {
      path: 'Vehiculo',
      component: VehiculosComponent,
    },
    {
      path: 'Repuesto',
      component: RepuestosComponent,
    }
  ]

//========================================================================

@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    TiposIdComponent,
    TiposUsComponent,
    TiposReComponent,
    TiposVeComponent,
    MarcasVeComponent,
    FormasPaComponent,
    PersonasComponent,
    VehiculosComponent,
    RepuestosComponent
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