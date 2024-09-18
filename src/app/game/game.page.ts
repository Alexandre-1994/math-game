import { Component, OnInit } from '@angular/core';
import { MathQuestionsService } from '../services/math-questions.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  currentQuestion: any;
  selectedAnswer: number = 0;
  correctAnswer!: number; 
  message: string | undefined;
  score: number = 0; 
  showCorrectAnswer: boolean = false; 


 
  // Variáveis para o temporizador
  timeLeft: number = 300; // Tempo inicial para cada partida (em segundos)
  interval: any;
  isGameOver: boolean = false;

  level: number = 1;
  correctAnswersInARow: number = 0; 
  maxCorrectAnswers: number = 8; // Quantidade de respostas consecutivas para avançar de nível



  constructor(private mathService: MathQuestionsService) { }

  ngOnInit() {
    this.startGame();
  }
  ngOnDestroy() {
    this.clearTimer(); // Limpa o intervalo quando a página é destruída
  }
  startGame() {
     this.resetGame();
    this.loadNewQuestion(this.level); // Inicia no nível atual
    this.startTimer();
  }
  resetGame() {
    this.score = 0;
    this.timeLeft = 30;
    this.isGameOver = false;
    this.level = 1;
    this.correctAnswersInARow = 0;
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
    if (this.isGameOver) return; // Não permite respostas após o tempo acabar

    this.selectedAnswer = option;
    this.correctAnswer = this.currentQuestion.correctAnswer;

    if (this.selectedAnswer === this.correctAnswer) {
      this.message = 'Correto!';
      this.score++;
      this.correctAnswersInARow++; // Aumenta contagem de respostas corretas consecutivas

      // Verifica se o jogador atingiu o número necessário para avançar de nível
      if (this.correctAnswersInARow >= this.maxCorrectAnswers) {
        this.levelUp();
      }

      setTimeout(() => {
        this.loadNewQuestion(this.level); // Carrega a próxima pergunta no nível atual
      }, 1000);
    } else {
      this.message = 'Errado!';
      this.showCorrectAnswer = true;
      this.correctAnswersInARow = 0; // Reseta contagem de respostas corretas consecutivas
      setTimeout(() => {
        this.loadNewQuestion(this.level);
      }, 2000);
    }
  }

  levelUp() {
    this.level++; // Aumenta o nível
    this.correctAnswersInARow = 0; // Reseta contagem de respostas corretas consecutivas
    this.message = `Parabéns! Você avançou para o nível ${this.level}.`;
    // Aqui você pode aumentar a dificuldade das perguntas, por exemplo
  }
}
