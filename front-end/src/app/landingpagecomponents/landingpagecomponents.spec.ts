import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Landingpagecomponents } from './landingpagecomponents';

describe('Landingpagecomponents', () => {
  let component: Landingpagecomponents;
  let fixture: ComponentFixture<Landingpagecomponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landingpagecomponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Landingpagecomponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
