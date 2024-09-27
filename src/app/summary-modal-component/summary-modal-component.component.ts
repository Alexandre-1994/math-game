import { Component, OnInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-summary-modal-component',
  templateUrl: './summary-modal-component.component.html',
  styleUrls: ['./summary-modal-component.component.scss'],
})
export class SummaryModalComponentComponent implements OnInit {
  @Input()
  totalQuestions!: number;
  @Input()
  totalCorrectAnswers!: number;
  @Input() accuracyPercentage: number;


  constructor(private modalController: ModalController) {
    this.accuracyPercentage = 0; // Initialize with a default value
  }

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss();
  }
}
