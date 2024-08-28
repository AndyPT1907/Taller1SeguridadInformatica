import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifradoAesComponent } from './cifrado-aes.component';

describe('CifradoAesComponent', () => {
  let component: CifradoAesComponent;
  let fixture: ComponentFixture<CifradoAesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CifradoAesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CifradoAesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
