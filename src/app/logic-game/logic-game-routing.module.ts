import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogicGamePage } from './logic-game.page';

const routes: Routes = [
  {
    path: '',
    component: LogicGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogicGamePageRoutingModule {}
