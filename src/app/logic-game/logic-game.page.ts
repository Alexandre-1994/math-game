import { Component, OnInit } from '@angular/core';
import { LogicQuestionsService } from '../services/logic-questions.service';

interface Question {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: string;
}

interface Level {
  nivel: number;
  perguntas: Question[];
}

@Component({
  selector: 'app-logic-game',
  templateUrl: './logic-game.page.html',
  styleUrls: ['./logic-game.page.scss'],
})
export class LogicGamePage implements OnInit {
  levels: Level[] = [];
  currentQuestion: Question | undefined;
  selectedAnswer: string | undefined;
  feedbackMessage: string | undefined;
  score: number = 0;
  wrongAnswers: number = 0;
  questionsAnswered: number = 0;
  correctAnswersInARow: number = 0;
  isGameStarted: boolean = false;
  isGamePaused: boolean = false;
  isGameOver: boolean = false;
  message: string | undefined;
  level: number = 1;
  unlockedLevels: number[] = [1];

  constructor(private logicQuestionsService: LogicQuestionsService) {}

  ngOnInit() {
    this.loadQuestions();
    this.unlockedLevels = this.getUnlockedLevels();
  }

  getUnlockedLevels(): number[] {
    const levels = JSON.parse(localStorage.getItem('unlockedLevels') || '[]');
    return levels.length ? levels : [1];
  }

  loadQuestions() {
    this.logicQuestionsService.getLogicQuestions().subscribe(
      (data) => {
        console.log('Perguntas carregadas:', data);
        this.levels = data.niveis;
        if (this.levels && this.levels.length > 0) {
          this.prepareGame();
        } else {
          console.error('Nenhuma pergunta disponível');
        }
      },
      (error) => {
        console.error('Erro ao carregar perguntas:', error);
      }
    );
  }

  prepareGame() {
    this.score = 0;
    this.wrongAnswers = 0;
    this.questionsAnswered = 0;
    this.correctAnswersInARow = 0;
    this.isGameOver = false;
    this.isGameStarted = false;
    this.loadNewQuestion();
  }

  loadNewQuestion() {
    const currentLevelQuestions = this.levels.find(l => l.nivel === this.level)?.perguntas;
    if (currentLevelQuestions && currentLevelQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * currentLevelQuestions.length);
      this.currentQuestion = currentLevelQuestions[randomIndex];
      console.log('Pergunta carregada:', this.currentQuestion);
    } else {
      console.error('Nível inválido ou perguntas não carregadas');
      this.endGame();
    }
  }

  selectAnswer(answer: string) {
    if (this.isGameOver || this.isGamePaused || !this.currentQuestion) return;

    this.selectedAnswer = answer;
    this.questionsAnswered++;

    if (this.selectedAnswer === this.currentQuestion.respostaCorreta) {
      this.feedbackMessage = 'Correto!';
      this.score++;
      this.correctAnswersInARow++;

      if (this.correctAnswersInARow === 10) {
        this.advanceToNextLevel();
      }
    } else {
      this.feedbackMessage = 'Errado!';
      this.wrongAnswers++;
      this.correctAnswersInARow = 0;
    }

    setTimeout(() => {
      this.feedbackMessage = undefined;
      this.loadNewQuestion();
    }, 1000);
  }

  advanceToNextLevel() {
    const nextLevel = this.level + 1;
    if (nextLevel <= this.levels.length) {
      this.level = nextLevel;
      this.correctAnswersInARow = 0;
      if (!this.unlockedLevels.includes(nextLevel)) {
        this.unlockedLevels.push(nextLevel);
        localStorage.setItem('unlockedLevels', JSON.stringify(this.unlockedLevels));
      }
      this.message = `Parabéns! Você avançou para o nível ${nextLevel}!`;
      setTimeout(() => {
        this.message = undefined;
        this.loadNewQuestion();
      }, 2000);
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.isGameOver = true;
    this.isGameStarted = false;
    this.message = `Fim de jogo! Sua pontuação final foi: ${this.score}`;
    if (this.level === this.levels.length) {
      this.message += ' Parabéns, você completou todos os níveis!';
    }
  }

  startGame() {
    this.prepareGame();
    this.isGameStarted = true;
    this.isGamePaused = false;
    console.log('Iniciando o jogo...');
  }

  toggleGame() {
    if (!this.isGameStarted) {
      this.startGame();
    } else {
      this.isGamePaused = !this.isGamePaused;
      console.log(this.isGamePaused ? 'Jogo pausado.' : 'Jogo retomado.');
    }
  }

  changeLevel(newLevel: number) {
    if (this.unlockedLevels.includes(newLevel)) {
      this.level = newLevel;
      this.prepareGame();
    }
  }
}