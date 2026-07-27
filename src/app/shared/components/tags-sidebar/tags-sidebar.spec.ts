import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSidebar } from './tags-sidebar';

describe('TagsSidebar', () => {
  let component: TagsSidebar;
  let fixture: ComponentFixture<TagsSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
