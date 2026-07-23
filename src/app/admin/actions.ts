"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, isAuthenticated } from "@/lib/auth";
import { isLockedOut, recordFailure, recordSuccess } from "@/lib/rate-limit";
import { getProjects, saveProjects, getTools, saveTools } from "@/lib/content-store";
import type {
  LocalizedText,
  Project,
  ProjectCategory,
  ProjectStatus,
  Tool,
} from "@/content/types";

async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown";
}

export async function loginAction(formData: FormData) {
  const key = await clientKey();

  const { locked, retryAfterMs } = isLockedOut(key);
  if (locked) {
    const minutes = Math.ceil(retryAfterMs / 60000);
    redirect(`/admin/login?error=locked&minutes=${minutes}`);
  }

  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    recordFailure(key);
    redirect("/admin/login?error=1");
  }

  recordSuccess(key);
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function csv(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const LOCALES: (keyof LocalizedText)[] = ["en", "ru", "it", "de", "fr"];

// Reads `${name}_en`, `${name}_ru`, ... back out of the form and reassembles
// a LocalizedText object. Falls back to the English value for any locale
// left blank, so a partial translation never renders empty text.
function localizedField(formData: FormData, name: string): LocalizedText {
  const en = String(formData.get(`${name}_en`) ?? "").trim();
  const result = {} as LocalizedText;
  for (const locale of LOCALES) {
    const value = String(formData.get(`${name}_${locale}`) ?? "").trim();
    result[locale] = value || en;
  }
  return result;
}

function localizedFieldOrUndefined(formData: FormData, name: string): LocalizedText | undefined {
  const value = localizedField(formData, name);
  return value.en ? value : undefined;
}

export async function upsertProjectAction(formData: FormData) {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const slug = originalSlug || slugify(title);

  const project: Project = {
    slug,
    title,
    category: String(formData.get("category")) as ProjectCategory,
    status: String(formData.get("status")) as ProjectStatus,
    statusNote: localizedFieldOrUndefined(formData, "statusNote"),
    shortDescription: localizedField(formData, "shortDescription"),
    fullDescription: localizedField(formData, "fullDescription"),
    techStack: csv(formData.get("techStack")),
    platform: String(formData.get("platform") ?? "").trim(),
    githubUrl: String(formData.get("githubUrl") ?? "").trim() || undefined,
    demoUrl: String(formData.get("demoUrl") ?? "").trim() || undefined,
    downloadUrl: String(formData.get("downloadUrl") ?? "").trim() || undefined,
  };

  const projects = await getProjects();
  const existingIndex = projects.findIndex((p) => p.slug === originalSlug);
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }
  await saveProjects(projects);

  revalidatePath("/[locale]/projects", "page");
  revalidatePath("/[locale]/projects/[slug]", "page");
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "");
  const projects = (await getProjects()).filter((p) => p.slug !== slug);
  await saveProjects(projects);
  revalidatePath("/[locale]/projects", "page");
  redirect("/admin");
}

export async function upsertToolAction(formData: FormData) {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = originalSlug || slugify(name);

  const tool: Tool = {
    slug,
    name,
    description: localizedField(formData, "description"),
    version: String(formData.get("version") ?? "").trim() || "N/A",
    platforms: csv(formData.get("platforms")),
    fileSize: String(formData.get("fileSize") ?? "").trim() || undefined,
    changelog: String(formData.get("changelog") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    downloadUrl: String(formData.get("downloadUrl") ?? "").trim() || undefined,
    sourceUrl: String(formData.get("sourceUrl") ?? "").trim() || undefined,
    unavailableNote: localizedFieldOrUndefined(formData, "unavailableNote"),
  };

  const tools = await getTools();
  const existingIndex = tools.findIndex((t) => t.slug === originalSlug);
  if (existingIndex >= 0) {
    tools[existingIndex] = tool;
  } else {
    tools.push(tool);
  }
  await saveTools(tools);

  revalidatePath("/[locale]/tools", "page");
  revalidatePath("/[locale]/tools/[slug]", "page");
  redirect("/admin");
}

export async function deleteToolAction(formData: FormData) {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "");
  const tools = (await getTools()).filter((t) => t.slug !== slug);
  await saveTools(tools);
  revalidatePath("/[locale]/tools", "page");
  redirect("/admin");
}

export async function uploadFileAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "Not authenticated" };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file selected" };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      error:
        "File uploads need Vercel Blob configured (BLOB_READ_WRITE_TOKEN). Paste a URL manually for now instead.",
    };
  }
  const { put } = await import("@vercel/blob");
  const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return { url: blob.url };
}
