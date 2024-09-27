import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogicGamePage } from './logic-game.page';

describe('LogicGamePage', () => {
  let component: LogicGamePage;
  let fixture: ComponentFixture<LogicGamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
