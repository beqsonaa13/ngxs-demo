import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";
import { environment } from "../environments/environment";

import { AppComponent } from './app.component';
import { AppState } from "./store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot(AppState),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({

      // you can use your custom logger
      // logger: customLogger,

      //do not log in production mode
      disabled: environment.production,

      // do not log some actions
      // filter: action => getActionTypeFromInstance(action) !== SomeAction.type
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
