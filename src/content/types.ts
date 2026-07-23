export type ProjectCategory =
  | "Desktop"
  | "Web"
  | "Android"
  | "AI"
  | "Automation"
  | "Experiments";

export type ProjectStatus = "Finished" | "In progress" | "Paused";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  platform: string;
  githubUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  statusNote?: string;
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  version: string;
  platforms: string[];
  fileSize?: string;
  changelog: string[];
  downloadUrl?: string;
  sourceUrl?: string;
  unavailableNote?: string;
};
