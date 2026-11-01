
import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { ProjectsComponent } from './pages/projects/projects';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'analysis',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
