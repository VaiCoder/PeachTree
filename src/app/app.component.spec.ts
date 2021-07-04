import { TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './bb-ui/components/footer/footer.component';
import { LogoComponent } from './bb-ui/components/logo/logo.component';
import { OverviewComponent } from './components/overview/overview.component';

describe('AppComponent', () => {
  const routes: Routes = [
    {
      path:'', 
      redirectTo: 'peachtree/overview',
      pathMatch: 'full'
    },
    {
      path:'peachtree', 
      children: [
        {
          path: 'overview',
          component: OverviewComponent
        }
      ]
    },
    {path: '**', redirectTo: '', pathMatch:'full'}
  ];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LogoComponent,
        FooterComponent,
        OverviewComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
