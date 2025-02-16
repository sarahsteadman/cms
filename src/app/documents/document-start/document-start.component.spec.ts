import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStartComponent } from './document-start.component';

describe('DocumentStartComponent', () => {
  let component: DocumentStartComponent;
  let fixture: ComponentFixture<DocumentStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
