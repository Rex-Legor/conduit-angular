import { Component, input } from '@angular/core';
import { Article } from '../../models/article.model';


@Component({
  selector: 'app-article-card',
  standalone: false,
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  article = input.required<Article>();
}
