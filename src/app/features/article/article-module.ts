import { NgModule } from '@angular/core';
import { Article } from './pages/article/article';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { ArticleRoutingModule } from './article-routing-module';

@NgModule({
  declarations: [Article],
  imports: [SharedModule, ArticleRoutingModule],
})
export class ArticleModule {}
