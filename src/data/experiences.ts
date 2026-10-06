import type { ExperienceDetail } from "@/components/shared/ExperienceModal";

export type { ExperienceDetail };

export const EXPERIENCES: ExperienceDetail[] = [
  {
    id: "drongo-ai",
    role: "Backend-Developer",
    company: "Drongo AI",
    year: "2026",
    period: "2026 — Present",
    mode: "On-Site",
    type: "Full-Time",
    location: "Bengaluru, India",
    isCurrent: true,
    summary:
      "Contributed to developer platform tooling, cloud console UX enhancements, and API integration testing.",
    highlights: [
      "Delivered interactive cloud performance dashboards used by 50,000+ developers.",
      "Built automated integration test suites increasing CI pipeline reliability to 99.4%.",
    ],
    skills: ["Go", "Python", "GCP", "Angular", "Docker", "PostgreSQL"],
  },
];
