import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogicGamePageRoutingModule } from './logic-game-routing.module';

import { LogicGamePage } from './logic-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogicGamePageRoutingModule
  ],
  declarations: [LogicGamePage]
})
export class LogicGamePageModule {}
