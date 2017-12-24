import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatTabsModule, MatGridListModule, MatTableModule, MatCardModule, MatTooltipModule, MatIconModule],
  exports: [MatButtonModule, MatToolbarModule, MatTabsModule, MatGridListModule, MatTableModule, MatCardModule, MatTooltipModule, MatIconModule],
})
export class MaterialModule { }
