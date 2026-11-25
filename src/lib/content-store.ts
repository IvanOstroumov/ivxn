import { promises as fs } from "fs";
import path from "path";
import type { Project, Tool } from "@/content/types";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const TOOLS_FILE = path.join(DATA_DIR, "tools.json");

const DEFAULT_PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");
const DEFAULT_TOOLS_FILE = path.join(process.cwd(), "content", "tools.json");

async function ensureSeeded(targetFile: string, fallbackFile: string) {
  try {
    await fs.access(targetFile);
  } catch {
    await fs.mkdir(path.dirname(targetFile), { recursive: true });
    const seedData = await fs.readFile(fallbackFile, "utf-8");
    await fs.writeFile(targetFile, seedData, "utf-8");
  }
}

async function readJsonFile<T>(targetFile: string, fallbackFile: string): Promise<T> {
  await ensureSeeded(targetFile, fallbackFile);
  const raw = await fs.readFile(targetFile, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile(targetFile: string, data: unknown) {
  await fs.mkdir(path.dirname(targetFile), { recursive: true });
  await fs.writeFile(targetFile, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export async function getProjects(): Promise<Project[]> {
  return readJsonFile<Project[]>(PROJECTS_FILE, DEFAULT_PROJECTS_FILE);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await writeJsonFile(PROJECTS_FILE, projects);
}

export async function getTools(): Promise<Tool[]> {
  return readJsonFile<Tool[]>(TOOLS_FILE, DEFAULT_TOOLS_FILE);
}

export async function saveTools(tools: Tool[]): Promise<void> {
  await writeJsonFile(TOOLS_FILE, tools);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getToolBySlug(slug: string) {
  const tools = await getTools();
  return tools.find((t) => t.slug === slug);
}