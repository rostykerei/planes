import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatOptionModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatTabsModule,
    MatGridListModule, MatTableModule, MatCardModule,
    MatTooltipModule, MatIconModule, MatFormFieldModule,
    MatChipsModule, MatOptionModule, MatAutocompleteModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatTabsModule,
    MatGridListModule, MatTableModule, MatCardModule,
    MatTooltipModule, MatIconModule, MatFormFieldModule,
    MatChipsModule, MatOptionModule, MatAutocompleteModule
  ]
})
export class MaterialModule {
}
