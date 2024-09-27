import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LevelUpModalComponent } from './level-up-modal/level-up-modal.component';

import { SummaryModalComponentComponent } from './summary-modal-component/summary-modal-component.component';
import { HttpClientModule } from '@angular/common/http';
import { LogicGamePage } from './logic-game/logic-game.page';
import { LogicQuestionsService } from './services/logic-questions.service';
import { LogicGamePageModule } from './logic-game/logic-game.module';

@NgModule({
  declarations: [AppComponent,  LevelUpModalComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    LogicGamePageModule,
   ],
  providers: [ { provide: RouteReuseStrategy,  useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
