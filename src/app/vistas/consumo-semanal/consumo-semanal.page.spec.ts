import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ConsumoSemanalPage } from './consumo-semanal.page';

describe('ConsumoSemanalPage', () => {
  let component: ConsumoSemanalPage;
  let fixture: ComponentFixture<ConsumoSemanalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsumoSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
