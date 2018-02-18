import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatTabsModule,
    MatGridListModule, MatTableModule, MatCardModule,
    MatTooltipModule, MatIconModule, MatFormFieldModule,
    MatChipsModule, MatOptionModule, MatAutocompleteModule,
    MatSidenavModule, MatNativeDateModule, MatDatepickerModule,
    MatButtonToggleModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatTabsModule,
    MatGridListModule, MatTableModule, MatCardModule,
    MatTooltipModule, MatIconModule, MatFormFieldModule,
    MatChipsModule, MatOptionModule, MatAutocompleteModule,
    MatSidenavModule, MatNativeDateModule, MatDatepickerModule,
    MatButtonToggleModule
  ]
})
export class MaterialModule {
}
