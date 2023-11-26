import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

<<<<<<< HEAD

=======
>>>>>>> creation-list-events
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule, CoreModule, SharedModule, HomeModule, BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
 })
=======
    AppRoutingModule, CoreModule, SharedModule, HomeModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
>>>>>>> creation-list-events
export class AppModule { }
