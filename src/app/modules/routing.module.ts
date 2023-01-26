import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { OrderDeliveryComponent } from '../components/order-delivery/order-delivery.component';

const routes: Routes = [
  {
    path: 'login',
	  component: LoginComponent
  },
  {
    path: 'order-delivery',
	  component: OrderDeliveryComponent
  },
  {
    path: '**',
	  redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }