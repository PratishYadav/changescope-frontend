
export interface Project {
  id: string;
  name: string;
  repositoryUrl: string;
  language: string;
  createdAt: string;
}

export interface ProjectRequest {
  name: string;
  repositoryUrl: string;
  language: string;
}
