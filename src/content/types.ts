export type ProjectCategory =
  | "Desktop"
  | "Web"
  | "Android"
  | "AI"
  | "Automation"
  | "Experiments";

export type ProjectStatus = "Finished" | "In progress" | "Paused";

// Text that has a version per site locale. Product names (Project.title,
// Tool.name) are deliberately NOT localized — proper nouns stay as-is across
// languages, same convention as everywhere else (game/app titles aren't
// translated). English is the fallback if a locale's translation is missing.
export type LocalizedText = {
  en: string;
  ru: string;
  it: string;
  de: string;
  fr: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  techStack: string[];
  platform: string;
  githubUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  statusNote?: LocalizedText;
  // Real screenshots, in /public/projects/{slug}/. Absent for projects that
  // don't have screenshots yet — ProjectGallery falls back to a placeholder.
  images?: string[];
};

export type Tool = {
  slug: string;
  name: string;
  description: LocalizedText;
  version: string;
  platforms: string[];
  fileSize?: string;
  changelog: string[];
  downloadUrl?: string;
  sourceUrl?: string;
  unavailableNote?: LocalizedText;
};
