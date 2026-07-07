import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'article',
    loadChildren: () => import('./features/article/article-module').then((m) => m.ArticleModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./features/editor/editor-module').then((m) => m.EditorModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home-module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile-module').then((m) => m.ProfileModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings-module').then((m) => m.SettingsModule),
  },
  // AuthModule is mounted at the empty path so its `login`/`register` child routes stay
  // top-level (`/login`, `/register`). Must be LAST: an empty-path route matches every URL
  // as a prefix, so it has to sit after the named feature routes or it would shadow them.
  {
    path: '',
    loadChildren: () => import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
