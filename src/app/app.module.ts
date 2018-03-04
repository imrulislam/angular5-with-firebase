import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

// FireBase Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// FireBase Imports

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Service
 import { ClientService } from './services/client.service';


// Router Configuration
const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addClient',
    component: AddClientComponent
  },
  {
    path: 'client/:id',
    component: ClientDetailsComponent
  }
  ,
  {
    path: 'edit-client/:id',
    component: EditClientComponent
  }
];
// Router Configuration End


// Firebase Configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCaHq9mqiItJnuNOO4xMERc4N5j6gzpEsM',
  authDomain: 'clientpanel-df754.firebaseapp.com',
  databaseURL: 'https://clientpanel-df754.firebaseio.com',
  storageBucket: 'clientpanel-df754.appspot.com',
  messagingSenderId: '436120538296'
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    FlashMessagesModule.forRoot(),
    FormsModule,
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    AngularFireModule.initializeApp( firebaseConfig )
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
