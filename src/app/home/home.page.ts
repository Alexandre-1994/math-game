import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
 // Método para selecionar o tipo de jogo
 selectGame(gameType: string) {
  console.log(`Game selected: ${gameType}`); // Verifica se o tipo de jogo é recebido corretamente
  if (gameType === 'math') {
    this.router.navigate(['/game'], { queryParams: { mode: 'math' } });
  } else if (gameType === 'logic') {
    this.router.navigate(['/logic-game'], { queryParams: { mode: 'logic' } });
  }
}

}
