import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathQuestionsService {

  constructor() { }
  // Método para gerar uma pergunta aleatória
  generateQuestion(level: number): any {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2;
    switch (level) {
      case 1: // Fácil
        num1 = this.getRandomInt(1, 10);
        num2 = this.getRandomInt(1, 10);
        break;
      case 2: // Médio
        num1 = this.getRandomInt(10, 100);
        num2 = this.getRandomInt(10, 100);
        break;
      case 3: // Difícil
        num1 = this.getRandomInt(100, 1000);
        num2 = this.getRandomInt(100, 1000);
        break;
      default:
        num1 = this.getRandomInt(1, 10);
        num2 = this.getRandomInt(1, 10);
    }

    // Certifique-se de que não há divisão por zero
    if (operation === '/' && num2 === 0) {
      num2 = 1;
    }

    const question = `${num1} ${operation} ${num2}`;
    const correctAnswer = eval(question); // Calcula a resposta correta

    // Gera opções de respostas
    const options = this.generateOptions(correctAnswer);

    return { question, correctAnswer, options };
  }

  // Método auxiliar para gerar um número aleatório entre dois valores
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Método para gerar opções de resposta (uma correta e outras incorretas)
  generateOptions(correctAnswer: number): number[] {
    const options = [correctAnswer];
    while (options.length < 4) {
      let option = this.getRandomInt(correctAnswer - 10, correctAnswer + 10);
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return this.shuffleArray(options);
  }

  // Método para embaralhar as opções
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
