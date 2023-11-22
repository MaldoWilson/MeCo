import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { GastoElectricoPage } from './gasto-electrico.page';

describe('GastoElectricoPage', () => {
  let component: GastoElectricoPage;
  let fixture: ComponentFixture<GastoElectricoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GastoElectricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
