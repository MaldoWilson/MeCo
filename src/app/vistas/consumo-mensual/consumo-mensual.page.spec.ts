import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumoMensualPage } from './consumo-mensual.page';

describe('ConsumoMensualPage', () => {
  let component: ConsumoMensualPage;
  let fixture: ComponentFixture<ConsumoMensualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsumoMensualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
