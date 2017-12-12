import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule, MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatTableModule, MatCardModule, MatTooltipModule, MatIconModule],
  exports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatTableModule, MatCardModule, MatTooltipModule, MatIconModule],
})
export class MaterialModule { }
