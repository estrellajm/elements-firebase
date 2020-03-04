import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { createCustomElement } from '@angular/elements';
import { UserPollComponent } from './user-poll/user-poll.component';

const config = {
  apiKey: "AIzaSyBWRISJCMt9q7tgT1nkNHE4DZXdDWuoE9U",
  authDomain: "dev-env-1a3a6.firebaseapp.com",
  databaseURL: "https://dev-env-1a3a6.firebaseio.com",
  projectId: "dev-env-1a3a6",
  storageBucket: "dev-env-1a3a6.appspot.com",
  messagingSenderId: "283816088223",
  appId: "1:283816088223:web:f5aa656ae5ccaeab"
}
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    UserPollComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  entryComponents:[
    UserPollComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { 
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(UserPollComponent, { injector: this.injector });
    
    customElements.define('user-poll', el);
   }
}
