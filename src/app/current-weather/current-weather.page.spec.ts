import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CurrentWeatherPage } from './current-weather.page';

describe('CurrentWeatherPage', () => {
  let component: CurrentWeatherPage;
  let fixture: ComponentFixture<CurrentWeatherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherPage],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
