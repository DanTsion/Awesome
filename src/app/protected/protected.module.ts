import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProtectedComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
  ]
})
export class ProtectedModule { }
