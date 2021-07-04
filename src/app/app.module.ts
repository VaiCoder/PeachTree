import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { OverviewComponent } from './components/overview/overview.component';
import { TransactionFilterPipe } from './transaction-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TransactionFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    BbUIModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor(){}

 }
