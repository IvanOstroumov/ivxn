import { promises as fs } from "fs";
import path from "path";
import type { Project, Tool } from "@/content/types";

/**
 * Content persistence for the admin panel.
 *
 * Production (Vercel): serverless filesystem is read-only/ephemeral, so writes
 * go to Vercel Blob (requires BLOB_READ_WRITE_TOKEN — see PROJECT_SPEC.md §6).
 * Local dev without that token: falls back to writing the JSON files directly
 * under /content, so the admin panel is fully testable before Blob is wired up.
 */

const PROJECTS_BLOB_PATH = "content/projects.json";
const TOOLS_BLOB_PATH = "content/tools.json";

const PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");
const TOOLS_FILE = path.join(process.cwd(), "content", "tools.json");

function hasBlobToken() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile(filePath: string, data: unknown) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

async function readBlobJson<T>(blobPath: string, fallbackFile: string): Promise<T> {
  if (!hasBlobToken()) {
    return readJsonFile<T>(fallbackFile);
  }
  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: blobPath, limit: 1 });
  if (blobs.length === 0) {
    // Not seeded in Blob yet — fall back to the bundled JSON as the initial dataset.
    return readJsonFile<T>(fallbackFile);
  }
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  return (await res.json()) as T;
}

async function writeBlobJson(blobPath: string, fallbackFile: string, data: unknown) {
  if (!hasBlobToken()) {
    await writeJsonFile(fallbackFile, data);
    return;
  }
  const { put } = await import("@vercel/blob");
  await put(blobPath, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getProjects(): Promise<Project[]> {
  return readBlobJson<Project[]>(PROJECTS_BLOB_PATH, PROJECTS_FILE);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await writeBlobJson(PROJECTS_BLOB_PATH, PROJECTS_FILE, projects);
}

export async function getTools(): Promise<Tool[]> {
  return readBlobJson<Tool[]>(TOOLS_BLOB_PATH, TOOLS_FILE);
}

export async function saveTools(tools: Tool[]): Promise<void> {
  await writeBlobJson(TOOLS_BLOB_PATH, TOOLS_FILE, tools);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getToolBySlug(slug: string) {
  const tools = await getTools();
  return tools.find((t) => t.slug === slug);
}
