import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@NgModule({
  // Reusable presentational components/pipes/directives get declared + exported here.
  declarations: [Header, Footer],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  // Re-export the common modules so features get them just by importing SharedModule.
  // No `providers` here — singletons belong in CoreModule / providedIn: 'root'.
  exports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer],
})
export class SharedModule {}
