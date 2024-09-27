import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathQuestionsService {

  constructor() { }

  // Método para gerar uma pergunta aleatória com base no nível
  generateQuestion(level: number) {
    let question, options, correctAnswer;
  
    switch (level) {
      case 1: // Nível Fácil
        ({ question, options, correctAnswer } = this.generateBasicOperation());
        break;
  
      case 2: // Nível Médio
        ({ question, options, correctAnswer } = this.generateComplexOperation());
        break;
  
      case 3: // Nível Difícil
        ({ question, options, correctAnswer } = this.generateFractionOrDecimal());
        break;
  
      case 4: // Nível Avançado - Álgebra Simples
        ({ question, options, correctAnswer } = this.generateAlgebraEquation());
        break;
  
      case 5: // Nível Avançado - Equações Quadráticas
        ({ question, options, correctAnswer } = this.generateQuadraticEquation());
        break;
  
      default: // Padrão
        ({ question, options, correctAnswer } = this.generateBasicOperation());
    }
  
    return { question, options, correctAnswer };
  }
  
  // Funções para gerar perguntas
  generateBasicOperation() {
    const num1 = this.getRandomInt(1, 10);
    const num2 = this.getRandomInt(1, 10);
    const operation = ['+', '-', '*', '/'][this.getRandomInt(0, 3)];
  
    const question = `${num1} ${operation} ${num2}`;
    const correctAnswer = eval(question); // Calcula o resultado correto
    const options = this.generateOptions(correctAnswer);
    
    return { question, options, correctAnswer };
  }
  
  generateComplexOperation() {
    const num1 = this.getRandomInt(10, 100);
    const num2 = this.getRandomInt(10, 100);
    const num3 = this.getRandomInt(1, 10);
    const question = `(${num1} + ${num2}) * ${num3}`;
    const correctAnswer = eval(question);
    const options = this.generateOptions(correctAnswer);
    
    return { question, options, correctAnswer };
  }
  
  generateFractionOrDecimal() {
    const num1 = this.getRandomFloat(1, 10);
    const num2 = this.getRandomFloat(1, 10);
    const question = `${num1.toFixed(1)} + ${num2.toFixed(1)}`;
    const correctAnswer = parseFloat((num1 + num2).toFixed(1));
    const options = this.generateOptions(correctAnswer);
    
    return { question, options, correctAnswer };
  }
  
  generateAlgebraEquation() {
    const x = this.getRandomInt(1, 10);
    const question = `x + 5 = ${x + 5}, solve for x`;
    const correctAnswer = x;
    const options = this.generateOptions(correctAnswer);
  
    return { question, options, correctAnswer };
  }
  
  generateQuadraticEquation(): { question: string; options?: number[]; correctAnswer?: number | null } {
    const a = this.getRandomInt(1, 5);
    const b = this.getRandomInt(1, 10);
    const c = this.getRandomInt(1, 10);
    const question = `Solve for x: ${a}x^2 + ${b}x + ${c} = 0`;
    const correctAnswer = this.solveQuadratic(a, b, c); // Implementar método para resolver equação quadrática
 

if (correctAnswer !== null) {
  const options = this.generateOptions(correctAnswer);
  return { question, options, correctAnswer };
} else {
  // Tratar o caso onde não há uma resposta correta, como nenhuma opção disponível
  return { question, options: [], correctAnswer: null };
}
  
  }

  // Função para resolver equações quadráticas
  solveQuadratic(a: number, b: number, c: number): number | null {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      // Nenhuma solução real, retorna null
      return null;
    }
  
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  
    // Retornar uma das soluções (ou poderia modificar para retornar um array com ambas)
    return x1; // ou x2
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

  // Método auxiliar para gerar um número aleatório entre dois valores
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomFloat(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
  }
}
