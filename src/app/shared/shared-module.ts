import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { NotFound } from './components/not-found/not-found';

@NgModule({
  // Reusable presentational components/pipes/directives get declared + exported here.
  declarations: [Header, Footer, NotFound],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  // Re-export the common modules so features get them just by importing SharedModule.
  // No `providers` here — singletons belong in CoreModule / providedIn: 'root'.
  exports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer, NotFound],
})
export class SharedModule {}
