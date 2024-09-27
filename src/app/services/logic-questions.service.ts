import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicQuestionsService {
  private questionsUrl = 'assets/data/logic-questions.json';
  constructor(private http: HttpClient) { }
  getLogicQuestions(): Observable<any> {
    return this.http.get<any>(this.questionsUrl);
  }
}
