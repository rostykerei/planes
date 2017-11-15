import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule],
})
export class MaterialModule { }
