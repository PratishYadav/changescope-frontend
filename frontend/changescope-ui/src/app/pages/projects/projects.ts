
import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);

  projects: Project[] = [];

  loading = true;
  submitting = false;
  error = '';
  success = '';

  readonly projectForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    repositoryUrl: [
      '',
      [
        Validators.required,
        Validators.pattern(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?\/?$/)
      ]
    ],
    language: ['TypeScript', Validators.required]
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load projects. Please check your backend connection.';
        this.loading = false;
      }
    });
  }

  registerProject(): void {
    this.success = '';
    this.error = '';

    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.projectService.registerProject(this.projectForm.getRawValue()).subscribe({
      next: (project) => {
        this.projects = [project, ...this.projects];
        this.success = 'Project registered successfully!';
        this.projectForm.reset({ name: '', repositoryUrl: '', language: 'TypeScript' });
        this.submitting = false;
      },
      error: (err) => {
        this.error =
          err.status === 0
            ? 'Cannot connect to the backend. Make sure Spring Boot is running.'
            : err.status === 409
              ? 'This repository is already registered.'
              : err.error?.message || 'Project registration failed. Please try again.';

        this.submitting = false;
      }
    });
  }
}
