"use client";

import ProfileCard from "@/components/bento/ProfileCard";
import ExperienceCard from "@/components/bento/ExperienceCard";
import TechStackCard from "@/components/bento/TechStackCard";
import FeaturedWorkCard from "@/components/bento/FeaturedWorkCard";
import MapCard from "@/components/bento/MapCard";
import GitHubCard from "@/components/bento/GitHubCard";
import type { Project } from "@/types";

interface HeroSectionProps {
  initialProjects?: Project[];
}

export default function HeroSection({ initialProjects }: HeroSectionProps) {
  return (
    <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 
        Bento Box Grid Layout matching Screenshot 1:
        - Left 8 cols: Profile, Experience + Tech Stack, Map + GitHub Activity
        - Right 4 cols: Featured Work Card (Tall)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column Section (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Row 1: Profile Card */}
          <ProfileCard />

          {/* Row 2: Experience & Tech Stack side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ExperienceCard />
            <TechStackCard />
          </div>

          {/* Row 3: Map & GitHub Activity side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-4">
              <MapCard />
            </div>
            <div className="md:col-span-8">
              <GitHubCard />
            </div>
          </div>
        </div>

        {/* Right Column Section (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col">
          <FeaturedWorkCard initialProjects={initialProjects} />
        </div>
      </div>
    </section>
  );
}
