import { Component, OnInit, OnDestroy } from '@angular/core';
import { MathQuestionsService } from '../services/math-questions.service';
import { ModalController } from '@ionic/angular';
import { LevelUpModalComponent } from '../level-up-modal/level-up-modal.component';
import { SummaryModalComponentComponent } from '../summary-modal-component/summary-modal-component.component';
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
  incorrectAnswers: number = 0; // Contador de erros
  isPaused: boolean = false;
  isGameStarted: boolean = false;
  isGamePaused: boolean = false;
  maxQuestions: number = 10; // Número máximo de perguntas por nível
  totalQuestions: number = 0; // Contador total de perguntas jogadas
  totalCorrectAnswers: number = 0; // Contador total de respostas corretas
  accuracyPercentage: number = 0; 
  // Variáveis para o temporizador
  timeLeft: number = 100;
  interval: any;
  isGameOver: boolean = false;

  // Variáveis para controle de nível e respostas corretas consecutivas
  level: number = 1; // Começar no nível 1
  correctAnswersInARow: number = 0;
  maxCorrectAnswers: number = 8;
  unlockedLevels: number[] = [];

  constructor(private mathService: MathQuestionsService, private modalController: ModalController) { }

  ngOnInit() {
    this.unlockedLevels = this.getUnlockedLevels();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  toggleGame() {
    if (!this.isGameStarted) {
      this.startGame(); // Inicia o jogo
    } else {
      this.isGamePaused ? this.resumeGame() : this.pauseGame(); // Pausa ou retoma o jogo
    }
  }

  startGame() {
    this.resetGame();
    this.loadNewQuestion(this.level);
    this.startTimer();
    this.isGameStarted = true;
  }

  resetGame() {
    this.score = 0;
    this.isGameOver = false;
    this.correctAnswersInARow = 0;
    this.incorrectAnswers = 0; // Reseta o contador de erros

    this.level = this.getStorage() ? parseInt(this.getStorage() as string) : 1;
    this.timeLeft = this.getLevelTime(this.level);
  }

  getLevelTime(level: number) {
    return 100 + (level - 1) * 30; // 100 segundos no nível 1, mais 30 segundos por nível adicional
  }

  getStorage() {
    return window.localStorage.getItem('level');
  }

  startTimer() {
    if (!this.isPaused) {
      this.clearTimer(); // Certifique-se de limpar o timer antes de reiniciar
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.isGameOver = true;
          this.clearTimer();
        }
      }, 1000);
    }
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loadNewQuestion(level: number) {
    if (!this.isGameOver) {
      this.currentQuestion = this.mathService.generateQuestion(level);
      this.selectedAnswer = undefined;
      this.correctAnswer = this.currentQuestion.correctAnswer;
      this.showCorrectAnswer = false;
      this.message = '';
    }
  }

  selectAnswer(option: number) {
    if (this.isGameOver) return;
  
    this.selectedAnswer = option;
    this.correctAnswer = this.currentQuestion.correctAnswer;
  
    // Incrementa o contador total de perguntas
    this.totalQuestions++;
  
    if (this.selectedAnswer === this.correctAnswer) {
      this.message = 'Correto!';
      this.score++;
      this.correctAnswersInARow++;
      this.totalCorrectAnswers++; // Incrementa o contador de acertos
    } else {
      this.message = 'Errado!';
      this.showCorrectAnswer = true;
      this.correctAnswersInARow = 0;
      this.incorrectAnswers++;
  
      // Verifica se o jogador errou metade das perguntas
      if (this.incorrectAnswers >= Math.floor(this.maxQuestions / 2)) {
        this.endGame();
        return; // Sai do método
      }
    }
  
    // Atualiza a porcentagem de acertos
    this.accuracyPercentage = (this.totalCorrectAnswers / this.totalQuestions) * 100;
  
    // Lógica para avançar para a próxima pergunta
    if (this.correctAnswersInARow >= this.maxCorrectAnswers) {
      this.levelUp();
    } else {
      setTimeout(() => {
        this.loadNewQuestion(this.level);
      }, 1000);
    }
  }

  async levelUp() {
    this.level++;
    this.unlockLevel(this.level);
    window.localStorage.setItem('level', this.level.toString());
    this.correctAnswersInARow = 0;

    // Reinicia o temporizador com mais 30 segundos
    this.clearTimer();
    this.timeLeft = this.getLevelTime(this.level);

    // Exibe o modal de parabéns
    const modal = await this.modalController.create({
      component: LevelUpModalComponent,
      componentProps: {
        level: this.level
      }
    });

    await modal.present();
    
    modal.onDidDismiss().then(() => {
      this.loadNewQuestion(this.level);
      this.startTimer();
    });
  }

  selectLevel(level: number) {
    const unlockedLevels = this.getUnlockedLevels();
    if (unlockedLevels.includes(level)) {
      this.level = level;
      this.startGame(); // Inicie o jogo se o nível estiver desbloqueado
    } else {
      alert('Este nível está bloqueado. Complete os níveis anteriores para desbloquear.');
    }
  }

  pauseGame() {
    this.clearTimer(); // Para o temporizador
    this.isGamePaused = true; // Define como pausado
  }

  resumeGame() {
    this.startTimer(); // Reinicia o temporizador
    this.isGamePaused = false; // Define como não pausado
  }

  // Método para obter níveis desbloqueados
  getUnlockedLevels(): number[] {
    const levels = JSON.parse(window.localStorage.getItem('unlockedLevels') || '[]');
    return levels.length ? levels : [1, 2]; // Por padrão, desbloqueia os níveis 1 e 2
  }

  // Método para desbloquear um nível
  unlockLevel(level: number) {
    const unlockedLevels = this.getUnlockedLevels();
    if (!unlockedLevels.includes(level)) {
      unlockedLevels.push(level);
      window.localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
    }
  }

  
  async endGame() {
    this.isGameOver = true;
    this.clearTimer();
  
    const modal = await this.modalController.create({
      component: SummaryModalComponentComponent, // Usar o nome correto
      componentProps: {
        totalQuestions: this.totalQuestions,
        totalCorrectAnswers: this.totalCorrectAnswers,
        accuracyPercentage: this.accuracyPercentage,
      }
    });
  
    await modal.present();
  }
}
