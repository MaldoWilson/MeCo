import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumoDiarioPage } from './consumo-diario.page';

describe('ConsumoDiarioPage', () => {
  let component: ConsumoDiarioPage;
  let fixture: ComponentFixture<ConsumoDiarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsumoDiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
