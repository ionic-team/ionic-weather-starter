import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ForecastPage } from './forecast.page';

describe('ForecastPage', () => {
  let component: ForecastPage;
  let fixture: ComponentFixture<ForecastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastPage],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
