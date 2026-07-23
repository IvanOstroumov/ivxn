import { getProjects, getTools } from "@/lib/content-store";

export const SITE_URL = "https://ivxn.dev";

export const SKILLS = {
  Languages: ["C#", "Java", "Kotlin", "PHP", "Python", "JavaScript", "TypeScript"],
  Development: ["Android", "Desktop", "Backend", "Databases", "APIs"],
  Technologies: ["Git", "Linux", "Cloud", "AI tools", "Automation"],
  Other: ["Digital Forensics", "Data Recovery", "Reverse Engineering", "Problem Solving"],
};

export const SERVICES = [
  { title: "Software Development", description: "Custom applications across desktop, web, and mobile." },
  { title: "Mobile Development", description: "Android apps, from idea to a working build." },
  { title: "Custom Tools", description: "Small utilities that remove a specific annoying problem." },
  { title: "Automation", description: "Scripts and systems that remove repetitive manual work." },
  { title: "Technical Consulting", description: "Help thinking through a technical decision before you build it." },
  { title: "Data Recovery / Digital Forensics", description: "Professional experience recovering and investigating data." },
];

export const ABOUT = [
  "I'm Ivan Ostroumov — a software developer who ends up building a bit of everything: desktop games, mobile apps, web tools, automation. If there's an interesting technical problem, I want to take it apart and see how it works.",
  "Right now my main professional focus is Data Recovery and Digital Forensics, but my projects show the rest of it — game dev in Unity, Android apps, web scrapers, and the occasional experiment that doesn't quite make it to the finish line.",
  "I build software, experiment with technology, and turn ideas into working products.",
];

export const CONTACT_LINKS = [
  { label: "GitHub", url: "https://github.com/IvanOstroumov" },
  // Telegram/WhatsApp/LinkedIn are not real links yet (see PROJECT_SPEC.md open items).
];

export async function getLlmsData() {
  const [projects, tools] = await Promise.all([getProjects(), getTools()]);
  return { projects, tools };
}
