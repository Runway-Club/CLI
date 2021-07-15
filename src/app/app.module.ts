import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CliBarComponent } from './components/cli-bar/cli-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbTagModule, NbToastrModule, NbInputModule, NbToastrService, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommandComponent } from './components/command/command.component';
import { FormsModule } from '@angular/forms';
import { SuggestionBarComponent } from './components/suggestion-bar/suggestion-bar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NeoCLIBarComponent } from './components/neo-clibar/neo-clibar.component';

@NgModule({
  declarations: [
    AppComponent,
    CliBarComponent,
    CommandComponent,
    SuggestionBarComponent,
    NeoCLIBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbTagModule,
    NbToastrModule.forRoot(),
    FormsModule,
    NbInputModule,
    NbListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
