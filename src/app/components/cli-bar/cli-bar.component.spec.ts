import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliBarComponent } from './cli-bar.component';

describe('CliBarComponent', () => {
  let component: CliBarComponent;
  let fixture: ComponentFixture<CliBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CliBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
