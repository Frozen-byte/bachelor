/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DezimalformComponent } from './dezimalform.component';

describe('DezimalformComponent', () => {
  let component: DezimalformComponent;
  let fixture: ComponentFixture<DezimalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DezimalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DezimalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
