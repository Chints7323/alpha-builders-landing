export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  fullDescription: string;
  images: string[];
  completedDate?: string;
}

export const categories = ["All", "Residential", "Kitchens", "Bathrooms", "Commercial", "Extensions"];

export let projects: Project[] = [];

export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/content/projects.json');
    const data = await response.json();
    projects = data.projects || [];
    return projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getRelatedProjects(currentId: string, category: string): Project[] {
  return projects
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, 3);
}
