import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Article } from './pages/article/article';

const routes: Routes = [{
  path: ':article',
  component: Article
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
