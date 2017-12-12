import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatTableModule, MatCardModule, MatTooltipModule],
  exports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatTableModule, MatCardModule, MatTooltipModule],
})
export class MaterialModule { }
