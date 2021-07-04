import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
