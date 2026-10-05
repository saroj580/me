import HeroSection from "@/components/sections/HeroSection";
import FooterSection from "@/components/sections/FooterSection";
import { getFeaturedProjects } from "@/actions/projects";

export default async function Home() {
  // Server-side prefetch with unstable_cache for instant rendering without client delay
  const projectsRes = await getFeaturedProjects();
  const initialProjects = projectsRes.success && projectsRes.data ? projectsRes.data : undefined;

  return (
    <div className="bg-[#edf0f4] min-h-screen text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Bento Grid Hero Section matching Screenshot 1 */}
      <main className="flex-1">
        <HeroSection initialProjects={initialProjects} />
      </main>

      {/* Dark Footer matching Screenshot 2 */}
      <FooterSection />
    </div>
  );
}
