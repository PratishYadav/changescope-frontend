
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly navigationItems = [
    { label: 'Dashboard', icon: 'grid', route: '/dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Impact Analysis', icon: 'git-branch', route: '/analysis' }
  ];

  readonly bottomNavigationItems = [
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
}
