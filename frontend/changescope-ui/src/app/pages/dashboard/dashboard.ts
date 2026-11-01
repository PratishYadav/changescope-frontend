
import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects: Project[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load projects. Check whether the backend is running.';
        this.loading = false;
      }
    });
  }

  get totalProjects(): number {
    return this.projects.length;
  }

  get languages(): string[] {
    return [...new Set(this.projects.map(project => project.language))];
  }
}
