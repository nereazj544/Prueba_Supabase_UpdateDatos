import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPerfilComponent } from './setting-perfil.component';

describe('SettingPerfilComponent', () => {
  let component: SettingPerfilComponent;
  let fixture: ComponentFixture<SettingPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
