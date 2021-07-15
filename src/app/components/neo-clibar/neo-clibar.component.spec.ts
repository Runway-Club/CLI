import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoCLIBarComponent } from './neo-clibar.component';

describe('NeoCLIBarComponent', () => {
  let component: NeoCLIBarComponent;
  let fixture: ComponentFixture<NeoCLIBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeoCLIBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoCLIBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
