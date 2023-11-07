import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticaConsumoPage } from './estadistica-consumo.page';

describe('EstadisticaConsumoPage', () => {
  let component: EstadisticaConsumoPage;
  let fixture: ComponentFixture<EstadisticaConsumoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstadisticaConsumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
