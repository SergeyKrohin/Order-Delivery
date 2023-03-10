import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Price } from './components/price/price.component';
import { DataService } from './services/data/api.service';
import { CookiesService } from './services/cookies/cookies.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './modules/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderDeliveryComponent  } from './components/order-delivery/order-delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderDeliveryComponent,
    Price
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DataService,
    CookiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
