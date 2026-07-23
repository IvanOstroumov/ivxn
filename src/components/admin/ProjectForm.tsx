import type { Project } from "@/content/types";
import { upsertProjectAction } from "@/app/admin/actions";
import { UploadButton } from "./UploadButton";

const CATEGORIES = ["Desktop", "Web", "Android", "AI", "Automation", "Experiments"];
const STATUSES = ["Finished", "In progress", "Paused"];

const inputClass =
  "w-full rounded-[var(--radius-theme)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2";

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={upsertProjectAction} className="flex flex-col gap-4">
      <input type="hidden" name="originalSlug" value={project?.slug ?? ""} />

      <label className="flex flex-col gap-1 text-sm">
        Title
        <input name="title" defaultValue={project?.title} required className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Category
        <select name="category" defaultValue={project?.category ?? "Web"} className={inputClass}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Status
        <select name="status" defaultValue={project?.status ?? "In progress"} className={inputClass}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Status note (optional — shown as a callout, e.g. why it's paused)
        <input name="statusNote" defaultValue={project?.statusNote} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Short description (for the grid card)
        <input
          name="shortDescription"
          defaultValue={project?.shortDescription}
          required
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Full description (for the detail page)
        <textarea
          name="fullDescription"
          defaultValue={project?.fullDescription}
          required
          rows={5}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Tech stack (comma-separated)
        <input
          name="techStack"
          defaultValue={project?.techStack.join(", ")}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Platform
        <input name="platform" defaultValue={project?.platform} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        GitHub URL
        <input name="githubUrl" defaultValue={project?.githubUrl} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Demo URL
        <input name="demoUrl" defaultValue={project?.demoUrl} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Download URL
        <span className="flex items-center gap-2">
          <input
            id="project-downloadUrl"
            name="downloadUrl"
            defaultValue={project?.downloadUrl}
            className={inputClass}
          />
          <UploadButton targetInputId="project-downloadUrl" />
        </span>
      </label>

      <button
        type="submit"
        className="mt-2 rounded-[var(--radius-theme)] px-4 py-2 font-medium"
        style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
      >
        Save
      </button>
    </form>
  );
}
