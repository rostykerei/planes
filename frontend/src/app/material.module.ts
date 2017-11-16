import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatTableModule, MatCardModule],
  exports: [MatButtonModule, MatToolbarModule, MatGridListModule, MatTableModule, MatCardModule],
})
export class MaterialModule { }
