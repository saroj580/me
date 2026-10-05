import HeroSection from "@/components/sections/HeroSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="bg-[#edf0f4] min-h-screen text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Bento Grid Hero Section matching Screenshot 1 */}
      <main className="flex-1">
        <HeroSection />
      </main>

      {/* Dark Footer matching Screenshot 2 */}
      <FooterSection />
    </div>
  );
}
