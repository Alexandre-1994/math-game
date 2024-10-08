import { Component, OnInit, OnDestroy } from '@angular/core';
import { MathQuestionsService } from '../services/math-questions.service';
import { ModalController } from '@ionic/angular';
import { LevelUpModalComponent } from '../level-up-modal/level-up-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  currentQuestion: any;
  selectedAnswer: number | undefined;
  correctAnswer: number | undefined;
  message: string | undefined;
  score: number = 0;
  showCorrectAnswer: boolean = false;

  // Variáveis para o temporizador
  timeLeft: number = 100;
  interval: any;
  isGameOver: boolean = false;

  // Variáveis para controle de nível e respostas corretas consecutivas
  level: number = 1;
  correctAnswersInARow: number = 0;
  maxCorrectAnswers: number = 8;

  constructor(private mathService: MathQuestionsService, private modalController: ModalController) { }

  ngOnInit() {
    this.startGame();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startGame() {
    this.resetGame();
    this.loadNewQuestion(this.level);
    this.startTimer();
  }

  resetGame() {
    this.score = 0;
    // this.timeLeft = 100;
    this.isGameOver = false;
    this.correctAnswersInARow = 0;

    if (this.getStorage()) {
      this.level = parseInt(this.getStorage() as any);
      this.timeLeft = this.getLevel(this.level)
      return
    }
    this.level = 1
    
  }

  // setup?/
  getLevel(level: number){
    let res: number
    if(level === 1 || level === undefined) {
      this.timeLeft == 100
      return res = this.timeLeft
    }
    return res = level * 100
  }

  getStorage(){
    return window.localStorage.getItem('level')
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.isGameOver = true;
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loadNewQuestion(level: number) {
    if (!this.isGameOver) {
      this.currentQuestion = this.mathService.generateQuestion(level);
      this.selectedAnswer = 0;
      this.correctAnswer = this.currentQuestion.correctAnswer;
      this.showCorrectAnswer = false;
      this.message = '';
    }
  }

  selectAnswer(option: number) {
    if (this.isGameOver) return;

    this.selectedAnswer = option;
    this.correctAnswer = this.currentQuestion.correctAnswer;

    if (this.selectedAnswer === this.correctAnswer) {
      this.message = 'Correto!';
      this.score++;
      this.correctAnswersInARow++;

      if (this.correctAnswersInARow >= this.maxCorrectAnswers) {
        this.levelUp();
      } else {
        setTimeout(() => {
          this.loadNewQuestion(this.level);
        }, 1000);
      }
    } else {
      this.message = 'Errado!';
      this.showCorrectAnswer = true;
      this.correctAnswersInARow = 0;
      setTimeout(() => {
        this.loadNewQuestion(this.level);
      }, 2000);
    }
  }

  async levelUp() {
    this.level++;
   window.localStorage.setItem('level', this.level as any)
    this.correctAnswersInARow = 0;
    // Limpar o temporizador atual
  this.clearTimer();
  // Reiniciar o temporizador com 30 segundos adicionais
  this.timeLeft = this.getLevel(this.level); // Adiciona 30 segundos extras

    // Exibir o modal para parabenizar o jogador
    const modal = await this.modalController.create({
      component: LevelUpModalComponent, // Este é o componente modal que vamos criar
      componentProps: {
        level: this.level
      }
    });

    await modal.present();
    
    // Continuar com o próximo nível após fechar o modal
    modal.onDidDismiss().then(() => {
      this.loadNewQuestion(this.level);
      this.startTimer(); // Reinicia o temporizador após o modal ser fechado
    });
  }
}
