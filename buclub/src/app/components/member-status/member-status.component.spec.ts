import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusComponent } from './member-status.component';

describe('MemberStatusComponent', () => {
  let component: MemberStatusComponent;
  let fixture: ComponentFixture<MemberStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
