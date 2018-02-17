import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
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
import {MomentDateModule} from "@angular/material-moment-adapter";

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatTabsModule,
    MatGridListModule, MatTableModule, MatCardModule,
    MatTooltipModule, MatIconModule, MatFormFieldModule,
    MatChipsModule, MatOptionModule, MatAutocompleteModule,
    MatSidenavModule, MatNativeDateModule, MatDatepickerModule,
    MomentDateModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatTabsModule,
    MatGridListModule, MatTableModule, MatCardModule,
    MatTooltipModule, MatIconModule, MatFormFieldModule,
    MatChipsModule, MatOptionModule, MatAutocompleteModule,
    MatSidenavModule, MatNativeDateModule, MatDatepickerModule
  ]
})
export class MaterialModule {
}
