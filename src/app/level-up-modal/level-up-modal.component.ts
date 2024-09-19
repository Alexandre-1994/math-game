import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-level-up-modal',
  templateUrl: './level-up-modal.component.html',
  styleUrls: ['./level-up-modal.component.scss'],
})
export class LevelUpModalComponent  implements OnInit {
  @Input() level: number | undefined; // Receber o nível atual como input

  constructor(private modalController: ModalController) { }
 // Método para fechar o modal
 closeModal() {
  this.modalController.dismiss();
}
  ngOnInit() {}

}
