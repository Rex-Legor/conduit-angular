import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { NotFound } from './components/not-found/not-found';
import { Tabs } from './components/tabs/tabs';
import { Tab } from './components/tabs/tab/tab';
import { Banner } from './components/banner/banner';
import { ArticleCard } from './components/article-card/article-card';
import { UserInfo } from './components/user-info/user-info';
import { Tags } from './components/tags/tags';
import { FavoriteButton } from './components/favorite-button/favorite-button';

@NgModule({
  // Reusable presentational components/pipes/directives get declared + exported here.
  declarations: [Header, Footer, NotFound, Tabs, Tab, Banner, ArticleCard, UserInfo, Tags, FavoriteButton],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  // Re-export the common modules so features get them just by importing SharedModule.
  // No `providers` here — singletons belong in CoreModule / providedIn: 'root'.
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    Header,
    Footer,
    NotFound,
    Tabs,
    Tab,
    Banner,
    ArticleCard,
    UserInfo,
    Tags,
    FavoriteButton,
  ],
})
export class SharedModule {}
