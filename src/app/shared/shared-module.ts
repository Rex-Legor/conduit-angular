import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  // Reusable presentational components/pipes/directives get declared + exported here.
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  // Re-export the common modules so features get them just by importing SharedModule.
  // No `providers` here — singletons belong in CoreModule / providedIn: 'root'.
  exports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
