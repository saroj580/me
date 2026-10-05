import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_PROJECTS = [
  {
    title: "Health AI Predictor",
    description: "AI/ML health assessment model and clinical analytics engine",
    techStack: ["Next.js", "Python", "FastAPI", "Tailwind CSS", "PyTorch"],
    imageUrl: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
    repoUrl: "https://github.com/saroj580",
    featured: true,
    order: 1,
  },
  {
    title: "PulseFlow Analytics",
    description: "Real-time financial telemetry dashboard with WebSocket streaming",
    techStack: ["React", "TypeScript", "WebSocket", "Apache Kafka", "PostgreSQL"],
    imageUrl: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
    repoUrl: "https://github.com/saroj580",
    featured: true,
    order: 2,
  },
  {
    title: "Sentinel Cloud OS",
    description: "Distributed infrastructure orchestration and monitoring platform",
    techStack: ["Docker", "Kubernetes", "Next.js", "Go", "Prometheus"],
    imageUrl: "/images/projects/health-ai.jpg",
    liveUrl: "https://github.com/saroj580",
    repoUrl: "https://github.com/saroj580",
    featured: true,
    order: 3,
  },
];

async function main() {
  console.log("Seeding Neon database projects...");

  for (const project of SEED_PROJECTS) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    });

    if (!existing) {
      await prisma.project.create({
        data: project,
      });
      console.log(`Created project: ${project.title}`);
    } else {
      await prisma.project.update({
        where: { id: existing.id },
        data: project,
      });
      console.log(`Updated project: ${project.title}`);
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
